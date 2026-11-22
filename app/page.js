import Link from "next/link";
import company from "@/data/company.json";
import policy from "@/data/policy.json";

// Spine heights and tones are fixed per position so the shelf looks hand-arranged,
// not random on every render.
const spineStyle = [
  { h: 92, tone: "deep" },
  { h: 78, tone: "ink" },
  { h: 100, tone: "mid" },
  { h: 84, tone: "paper" },
  { h: 96, tone: "deep" },
  { h: 74, tone: "pale" },
  { h: 88, tone: "ink" },
  { h: 98, tone: "mid" },
  { h: 80, tone: "paper" },
  { h: 90, tone: "deep" },
];

const reasons = [
  {
    title: "We hold other people's details",
    body: "Every order puts a name and a home address in our hands. Losing them hurts our readers first, and our reputation right after.",
  },
  {
    title: "A small team is an easy target",
    body: "Attackers know a 15-person shop has no security department. One convincing email to one person can be enough.",
  },
  {
    title: "Downtime stops the shop",
    body: "If the web shop or the label printer goes down, orders stop shipping. Simple habits keep us running.",
  },
];

const tools = [
  {
    href: "/risk",
    title: "Rate a risk",
    body: "Pick a threat, judge how likely it is and how much it would hurt, and see its priority.",
  },
  {
    href: "/checklist",
    title: "Run the security checklist",
    body: "Tick off the basics we should have in place and see how many pass.",
  },
  {
    href: "/quiz",
    title: "Take the phishing quiz",
    body: "Read five example emails and decide which ones are trying to trick you.",
  },
  {
    href: "/plan",
    title: "See the project plan",
    body: "The five phases of this project, who owns each one and when.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero__text">
          <h1 className="hero__title">How a small bookshop keeps its readers safe.</h1>
          <p className="hero__lede">{company.summary}</p>
          <p className="hero__lede">
            This portal holds our security policy and the tools we use to keep it honest. Each
            book on the shelf is one part of the policy.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" href="/policy">
              Read the policy
            </Link>
            <Link className="button" href="/quiz">
              Take the phishing quiz
            </Link>
          </div>
        </div>

        <nav className="shelf" aria-label="Policy sections">
          <ol className="shelf__row">
            {policy.map((section, i) => {
              const s = spineStyle[i % spineStyle.length];
              return (
                <li key={section.id} style={{ "--h": `${s.h}%`, "--i": i }}>
                  <Link
                    href={`/policy#${section.id}`}
                    className={`spine spine--${s.tone}`}
                  >
                    <span className="spine__title">{section.title}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="shelf__board" aria-hidden="true" />
          <p className="shelf__caption">
            {policy.length} sections. Pick any book to open that part of the policy.
          </p>
        </nav>
      </section>

      <section className="band">
        <div className="wrap">
          <h2 className="section-title">Why security matters for a shop our size</h2>
          <div className="reasons">
            {reasons.map((r) => (
              <div key={r.title} className="reason">
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap split">
        <div>
          <h2 className="section-title">What we look after</h2>
          <ul className="ledger">
            {company.data.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="section-title">The systems we run on</h2>
          <ul className="ledger">
            {company.systems.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap tools">
        <h2 className="section-title">Practise the policy</h2>
        <ul className="tool-list">
          {tools.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="tool">
                <span className="tool__title">{t.title}</span>
                <span className="tool__body">{t.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
