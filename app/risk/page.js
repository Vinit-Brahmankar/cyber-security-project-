import risks from "@/data/risks.json";
import RiskTool from "@/components/RiskTool";
import { riskScore, riskBand } from "@/lib/risk";

export const metadata = { title: "Risk assessment" };

export default function RiskPage() {
  const register = risks
    .map((r) => ({ ...r, score: riskScore(r.likelihood, r.impact) }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Risk assessment</h1>
        <p className="page-head__lede">
          Pick a threat, rate how likely it is and how much it would hurt, and see its priority.
          Low counts as 1, medium as 2 and high as 3. The priority is likelihood times impact.
        </p>
      </header>

      <RiskTool risks={risks} />

      <section className="register">
        <h2 className="section-title">Our risk register</h2>
        <p className="register__lede">The team&apos;s current rating for each threat, highest priority first.</p>
        <div className="table-scroll">
          <table className="register__table">
            <thead>
              <tr>
                <th scope="col">Threat</th>
                <th scope="col">Likelihood</th>
                <th scope="col">Impact</th>
                <th scope="col">Priority</th>
              </tr>
            </thead>
            <tbody>
              {register.map((r) => {
                const band = riskBand(r.score);
                return (
                  <tr key={r.threat}>
                    <td>{r.threat}</td>
                    <td>{r.likelihood}</td>
                    <td>{r.impact}</td>
                    <td>
                      <span className={`pill pill--${band.toLowerCase()}`}>
                        {r.score} {band}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
