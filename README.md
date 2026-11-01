# TokenSight

**Instant clarity on your AI spend.**

Upload an OpenAI, Anthropic, or any AI provider usage CSV and immediately see cost by model, by day, total tokens, and budget progress. Beautiful, privacy-first, works in the browser.

## Why this exists

AI token spend is rising fast (a16z 2026 data: token spending +122–160% while prices fell). Indie builders and small teams lack simple visibility. Enterprise tools are heavy. Spreadsheets are slow. TokenSight fills the gap.

## Main features

- Drag-and-drop CSV analysis (OpenAI, Anthropic, generic token exports)
- Auto column detection
- Cost by model and by day charts
- Budget progress with warnings
- Dark / light mode
- Free plan (browser-only) + Pro plan architecture
- Privacy Policy & Terms included

## Tech stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Recharts
- PapaParse for CSV
- Zustand-ready (local state)
- No required backend for core value (client-side parsing)

## Prerequisites

- Node.js 18+
- npm

## Local installation

```bash
git clone https://github.com/shabanihamidu19-cell/tokensight.git
cd tokensight
npm install
npm run dev
```

Open http://localhost:3000

## Environment variables

Copy `.env.example` to `.env.local` for future production features (auth, payments, saved projects).

```bash
cp .env.example .env.local
```

Core product works without any keys.

## Database / Auth / Payments

- Free tier: fully client-side. No database required.
- Pro (documented): Supabase for saved projects + Stripe for subscriptions.
- Webhooks and server-side verification are architected but require your own keys.
- Never commit secrets.

## How to run

```bash
npm run dev      # development
npm run build    # production build
npm start        # production server
```

## Deploy to Vercel

1. Import this repo in Vercel
2. Add env vars if using Pro features
3. Deploy

Next.js works out of the box.

## Monetization

- Free: unlimited browser analyses, 1 project view
- Pro $19/mo: saved history, multiple projects, email alerts, team seats, PDF export

Stripe Checkout + Customer Portal + webhooks are ready to wire with env vars.

## Quality notes

- Primary workflow (CSV → charts → budget) is fully functional without external services.
- Responsive mobile / tablet / desktop
- Dark / light themes
- Error states for bad CSVs
- No fake data presented as real customer data

## Legal

Privacy Policy and Terms of Service are product-specific placeholders. They have not received professional legal review.

---

Built as a complete, shippable micro-SaaS MVP.
