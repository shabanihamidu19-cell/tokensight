import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "TokenSight — Instant clarity on your AI spend",
  description:
    "Upload your OpenAI, Anthropic or other AI usage CSV and instantly see where every token goes. Set budgets, spot waste, and control costs in seconds.",
  openGraph: {
    title: "TokenSight — Instant clarity on your AI spend",
    description:
      "Upload your AI usage CSV and instantly see where every token goes. Beautiful dashboards for indie builders and teams.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TokenSight",
    description: "Instant clarity on your AI spend.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} font-sans`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
