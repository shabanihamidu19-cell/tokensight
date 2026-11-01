import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: November 2, 2026</p>
        <div className="prose prose-neutral dark:prose-invert mt-8 space-y-4 text-sm">
          <p>
            By using TokenSight you agree to these terms. The service is provided “as is” for analyzing AI usage data you supply.
          </p>
          <h2 className="text-lg font-semibold">Acceptable use</h2>
          <p>
            You may only upload data you have the right to process. Do not upload data containing personal information of third parties without a lawful basis.
          </p>
          <h2 className="text-lg font-semibold">No warranty</h2>
          <p>
            Cost estimates use publicly known list prices and may differ from your actual invoices. Always verify against your provider’s official billing.
          </p>
          <h2 className="text-lg font-semibold">Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, TokenSight and its operators are not liable for any indirect, incidental, or consequential damages arising from use of the service.
          </p>
          <h2 className="text-lg font-semibold">Changes</h2>
          <p>We may update these terms. Continued use after changes constitutes acceptance.</p>
          <p className="text-muted-foreground">
            This is a product-specific terms document generated for the TokenSight MVP. It has not received professional legal review.
          </p>
        </div>
      </div>
    </div>
  );
}
