# Security Policy Portal

A demo website for **Lantern Row Books**, a fictional 15-person online bookstore. It presents the company's security policy and turns the risk assessment, training and monitoring parts of the brief into interactive pages.

This is a student prototype with fictional data. The checklist is self-reported and the tools are teaching aids, not a security scanner, verified compliance or a professional audit.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things live

- `data/` holds all content: `policy.json`, `risks.json`, `checklist.json`, `quiz.json`, plus `company.json` (the fictional company profile).
- `app/` has one folder per page: `/`, `/policy`, `/risk`, `/checklist`, `/quiz`, `/plan`.
- `components/` holds shared pieces (navigation, policy contents sidebar).
- `app/globals.css` holds the whole design system (colours, type scale, layout).

Stack: Next.js (App Router) and plain CSS. No database, no login, no backend.
