import { Literata, Schibsted_Grotesk } from "next/font/google";
import SiteNav from "@/components/SiteNav";
import company from "@/data/company.json";
import "./globals.css";

const literata = Literata({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const grotesk = Schibsted_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: `${company.name} security policy`,
    template: `%s | ${company.name}`,
  },
  description:
    "A demo security policy portal for a fictional online bookstore: policy, risk assessment, checklist and phishing quiz.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${literata.variable} ${grotesk.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <p>
              {company.name} is a fictional company. This portal is a student prototype with
              made-up data. The checklist is self-reported and the tools are teaching aids, not a
              security scanner, a compliance check or a professional audit.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
