import policy from "@/data/policy.json";
import company from "@/data/company.json";
import PolicyBody from "@/components/PolicyBody";
import PolicyContents from "@/components/PolicyContents";

export const metadata = { title: "Policy" };

export default function PolicyPage() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Security policy</h1>
        <p className="page-head__lede">
          The rules everyone at {company.name} follows to protect customer data and keep the shop
          running. It takes about ten minutes to read.
        </p>
        <p className="page-head__meta">Version 1.0, reviewed once a year by the owner and operations lead.</p>
      </header>

      <div className="policy-layout">
        <PolicyContents sections={policy.map(({ id, title }) => ({ id, title }))} />

        <article className="policy">
          {policy.map((section, i) => (
            <section key={section.id} id={section.id} className="policy-section">
              <h2>
                <span className="policy-section__num">{i + 1}</span>
                {section.title}
              </h2>
              <PolicyBody text={section.body} />
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
