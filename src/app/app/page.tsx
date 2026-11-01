"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Upload,
  BarChart3,
  DollarSign,
  FileText,
  AlertTriangle,
  ArrowLeft,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { parseUsageCSV, AnalysisResult } from "@/lib/csv-parser";
import { useTheme } from "@/components/theme-provider";

const COLORS = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe", "#7c3aed"];

export default function AppPage() {
  const { theme, toggleTheme } = useTheme();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [budget, setBudget] = useState(100);
  const [drag, setDrag] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.endsWith(".csv") && !file.type.includes("csv")) {
      setError("Please upload a CSV file");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await parseUsageCSV(file);
      setAnalysis(result);
    } catch (e: any) {
      setError(e.message || "Failed to parse CSV");
    } finally {
      setLoading(false);
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDrag(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const modelData = analysis
    ? Object.entries(analysis.byModel)
        .map(([name, v]) => ({ name: name.slice(0, 20), value: +v.cost.toFixed(4) }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8)
    : [];

  const dayData = analysis
    ? Object.entries(analysis.byDay)
        .map(([date, cost]) => ({ date: date.slice(5), cost: +cost.toFixed(4) }))
        .sort((a, b) => a.date.localeCompare(b.date))
    : [];

  const budgetPct = analysis ? Math.min(100, (analysis.totalCost / budget) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> TokenSight
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="rounded-md p-2 text-muted-foreground hover:bg-muted">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <Link href="/#pricing" className="text-sm font-medium text-primary">
              Upgrade
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {!analysis ? (
          <div className="mx-auto max-w-xl">
            <h1 className="text-2xl font-bold">Analyze AI spend</h1>
            <p className="mt-2 text-muted-foreground">
              Drop a usage CSV from OpenAI, Anthropic, Google, or any provider that exports token counts.
            </p>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={onDrop}
              className={`mt-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-colors ${
                drag ? "border-primary bg-primary/5" : "border-border bg-muted/20"
              }`}
            >
              <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
              <p className="font-medium">Drag & drop your CSV here</p>
              <p className="mt-1 text-sm text-muted-foreground">or click to browse</p>
              <input
                type="file"
                accept=".csv,text/csv"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
                style={{ position: "relative", width: "100%", height: "100%", marginTop: "-8rem" }}
              />
              {loading && <p className="mt-4 text-sm text-primary">Parsing…</p>}
              {error && (
                <p className="mt-4 flex items-center gap-2 text-sm text-red-500">
                  <AlertTriangle className="h-4 w-4" /> {error}
                </p>
              )}
            </div>

            <div className="mt-8 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Tip</p>
              <p className="mt-1">
                From OpenAI: Settings → Organization → Usage → Export. From Anthropic: Console → Usage → Download. Columns for date, model, input/output tokens (or cost) are auto-detected.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Spend analysis</h1>
                <p className="text-sm text-muted-foreground">
                  {analysis.periodStart} → {analysis.periodEnd} · {analysis.rows.length} rows
                </p>
              </div>
              <button
                onClick={() => setAnalysis(null)}
                className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
              >
                New upload
              </button>
            </div>

            {/* KPI cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" /> Total cost
                </div>
                <p className="mt-2 text-2xl font-bold">${analysis.totalCost.toFixed(2)}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" /> Input tokens
                </div>
                <p className="mt-2 text-2xl font-bold">{(analysis.totalInput / 1e6).toFixed(2)}M</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BarChart3 className="h-4 w-4" /> Output tokens
                </div>
                <p className="mt-2 text-2xl font-bold">{(analysis.totalOutput / 1e6).toFixed(2)}M</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  Budget progress
                </div>
                <p className="mt-2 text-2xl font-bold">{budgetPct.toFixed(0)}%</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${budgetPct > 90 ? "bg-red-500" : budgetPct > 70 ? "bg-amber-500" : "bg-primary"}`}
                    style={{ width: `${budgetPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Budget control */}
            <div className="rounded-xl border border-border bg-card p-5">
              <label className="text-sm font-medium">Monthly budget ($)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value) || 0)}
                className="mt-2 w-32 rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
              {budgetPct > 80 && (
                <p className="mt-2 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="h-4 w-4" />
                  You are at {budgetPct.toFixed(0)}% of budget. Consider routing more traffic to cheaper models.
                </p>
              )}
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 font-semibold">Cost by day</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dayData}>
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v: number) => [`$${v}`, "Cost"]} />
                      <Bar dataKey="cost" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 font-semibold">Cost by model</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={modelData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {modelData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => `$${v}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Model table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="border-b border-border px-5 py-3 font-semibold">Breakdown by model</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="px-5 py-3">Model</th>
                      <th className="px-5 py-3">Cost</th>
                      <th className="px-5 py-3">Input</th>
                      <th className="px-5 py-3">Output</th>
                      <th className="px-5 py-3">Calls</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(analysis.byModel)
                      .sort((a, b) => b[1].cost - a[1].cost)
                      .map(([model, v]) => (
                        <tr key={model} className="border-b border-border/50">
                          <td className="px-5 py-3 font-medium">{model}</td>
                          <td className="px-5 py-3">${v.cost.toFixed(4)}</td>
                          <td className="px-5 py-3">{(v.input / 1000).toFixed(1)}k</td>
                          <td className="px-5 py-3">{(v.output / 1000).toFixed(1)}k</td>
                          <td className="px-5 py-3">{v.count}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
