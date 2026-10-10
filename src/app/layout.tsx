import type { Metadata } from "next";
import { Header, Footer } from "@/components/site-shell";
import { site } from "@/content/site";
import "./globals.css";
const origin = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(origin || "http://localhost:3000"),
  title: {
    default: "Shicheng Hu — AI & Multi-Agent Systems",
    template: "%s | Shicheng Hu",
  },
  description: site.description,
  openGraph: {
    title: "Shicheng Hu",
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: "Shicheng Hu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shicheng Hu",
    description: site.description,
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="site-container">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
