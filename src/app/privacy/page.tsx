import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: November 2, 2026</p>
        <div className="prose prose-neutral dark:prose-invert mt-8 space-y-4 text-sm">
          <p>
            TokenSight (“we”, “us”) provides a tool for analyzing AI usage CSVs. This policy explains what data we process.
          </p>
          <h2 className="text-lg font-semibold">Data we process</h2>
          <p>
            When you upload a CSV for analysis, parsing happens in your browser by default. The file contents are not sent to our servers unless you explicitly choose to save a project (Pro feature). We do not store raw CSV content on free plans.
          </p>
          <h2 className="text-lg font-semibold">Account data</h2>
          <p>
            If you create an account, we store your email and authentication data. Payment data is handled by our payment provider (Stripe); we never see full card numbers.
          </p>
          <h2 className="text-lg font-semibold">Analytics</h2>
          <p>
            We may use privacy-friendly analytics to understand product usage (page views, feature clicks). No personal content from your CSVs is included.
          </p>
          <h2 className="text-lg font-semibold">Contact</h2>
          <p>Questions: privacy@tokensight.app (placeholder).</p>
          <p className="text-muted-foreground">
            This is a product-specific policy generated for the TokenSight MVP. It has not received professional legal review.
          </p>
        </div>
      </div>
    </div>
  );
}
