import Papa from "papaparse";

export interface UsageRow {
  date: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  raw: Record<string, string>;
}

export interface AnalysisResult {
  rows: UsageRow[];
  totalCost: number;
  totalInput: number;
  totalOutput: number;
  byModel: Record<string, { cost: number; input: number; output: number; count: number }>;
  byDay: Record<string, number>;
  periodStart: string;
  periodEnd: string;
}

// Approximate prices per 1M tokens (2026 mid-tier defaults)
const DEFAULT_PRICES: Record<string, { in: number; out: number }> = {
  "gpt-4o": { in: 2.5, out: 10 },
  "gpt-4o-mini": { in: 0.15, out: 0.6 },
  "gpt-4.1": { in: 2, out: 8 },
  "gpt-4.1-mini": { in: 0.4, out: 1.6 },
  "claude-3-5-sonnet": { in: 3, out: 15 },
  "claude-3-5-haiku": { in: 0.8, out: 4 },
  "claude-sonnet-4": { in: 3, out: 15 },
  "claude-haiku-4": { in: 0.8, out: 4 },
  "gemini-1.5-pro": { in: 1.25, out: 5 },
  "gemini-1.5-flash": { in: 0.075, out: 0.3 },
  "gemini-2.0-flash": { in: 0.1, out: 0.4 },
  default: { in: 1, out: 3 },
};

function findPrice(model: string) {
  const lower = model.toLowerCase();
  for (const [key, price] of Object.entries(DEFAULT_PRICES)) {
    if (lower.includes(key.replace(/-/g, "")) || lower.includes(key)) {
      return price;
    }
  }
  return DEFAULT_PRICES.default;
}

function detectColumns(headers: string[]) {
  const h = headers.map((x) => x.toLowerCase().trim());
  const dateIdx = h.findIndex((x) => x.includes("date") || x.includes("time") || x === "timestamp");
  const modelIdx = h.findIndex((x) => x.includes("model") || x.includes("engine"));
  const inputIdx = h.findIndex(
    (x) =>
      x.includes("input") ||
      x.includes("prompt") ||
      x.includes("n_context") ||
      x === "tokens" ||
      x.includes("prompt_tokens")
  );
  const outputIdx = h.findIndex(
    (x) =>
      x.includes("output") ||
      x.includes("completion") ||
      x.includes("n_output") ||
      x.includes("completion_tokens")
  );
  const costIdx = h.findIndex((x) => x.includes("cost") || x.includes("amount") || x.includes("usd"));

  return { dateIdx, modelIdx, inputIdx, outputIdx, costIdx };
}

export function parseUsageCSV(file: File): Promise<AnalysisResult> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = results.data as Record<string, string>[];
          if (!data.length) {
            reject(new Error("CSV is empty"));
            return;
          }
          const headers = Object.keys(data[0]);
          const cols = detectColumns(headers);

          const rows: UsageRow[] = [];
          let totalCost = 0;
          let totalInput = 0;
          let totalOutput = 0;
          const byModel: AnalysisResult["byModel"] = {};
          const byDay: Record<string, number> = {};

          for (const raw of data) {
            const values = Object.values(raw);
            const date =
              cols.dateIdx >= 0
                ? String(values[cols.dateIdx] || "").slice(0, 10)
                : new Date().toISOString().slice(0, 10);
            const model =
              cols.modelIdx >= 0 ? String(values[cols.modelIdx] || "unknown") : "unknown";
            let inputTokens =
              cols.inputIdx >= 0 ? parseFloat(String(values[cols.inputIdx] || "0")) || 0 : 0;
            let outputTokens =
              cols.outputIdx >= 0 ? parseFloat(String(values[cols.outputIdx] || "0")) || 0 : 0;

            // Some CSVs put total tokens in one column
            if (inputTokens === 0 && outputTokens === 0 && cols.inputIdx >= 0) {
              const total = parseFloat(String(values[cols.inputIdx] || "0")) || 0;
              inputTokens = Math.round(total * 0.7);
              outputTokens = total - inputTokens;
            }

            let cost = 0;
            if (cols.costIdx >= 0) {
              cost = parseFloat(String(values[cols.costIdx] || "0").replace(/[^0-9.]/g, "")) || 0;
            } else {
              const price = findPrice(model);
              cost = (inputTokens / 1_000_000) * price.in + (outputTokens / 1_000_000) * price.out;
            }

            rows.push({
              date,
              model,
              inputTokens,
              outputTokens,
              cost,
              raw,
            });

            totalCost += cost;
            totalInput += inputTokens;
            totalOutput += outputTokens;

            if (!byModel[model]) {
              byModel[model] = { cost: 0, input: 0, output: 0, count: 0 };
            }
            byModel[model].cost += cost;
            byModel[model].input += inputTokens;
            byModel[model].output += outputTokens;
            byModel[model].count += 1;

            byDay[date] = (byDay[date] || 0) + cost;
          }

          const dates = Object.keys(byDay).sort();
          resolve({
            rows,
            totalCost,
            totalInput,
            totalOutput,
            byModel,
            byDay,
            periodStart: dates[0] || "",
            periodEnd: dates[dates.length - 1] || "",
          });
        } catch (e) {
          reject(e);
        }
      },
      error: (err) => reject(err),
    });
  });
}
