"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/policy", label: "Policy" },
  { href: "/risk", label: "Risk assessment" },
  { href: "/checklist", label: "Checklist" },
  { href: "/quiz", label: "Phishing quiz" },
  { href: "/plan", label: "Project plan" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href="/" className="wordmark">
          <span className="wordmark__name">Lantern Row Books</span>
          <span className="wordmark__sub">Security policy</span>
        </Link>
        <nav aria-label="Main">
          <ul className="nav-list">
            {links.map(({ href, label }) => {
              const current = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link href={href} aria-current={current ? "page" : undefined}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
