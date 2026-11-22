"use client";

import { useState } from "react";
import { LEVELS, riskScore, riskBand, BAND_ADVICE } from "@/lib/risk";

function LevelPicker({ name, label, value, onChange }) {
  return (
    <fieldset className="segmented">
      <legend>{label}</legend>
      <div className="segmented__options">
        {LEVELS.map((level) => (
          <label key={level} className="segmented__option">
            <input
              type="radio"
              name={name}
              value={level}
              checked={value === level}
              onChange={() => onChange(level)}
            />
            <span>{level[0].toUpperCase() + level.slice(1)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function RiskTool({ risks }) {
  const [index, setIndex] = useState(0);
  const [likelihood, setLikelihood] = useState(risks[0].likelihood);
  const [impact, setImpact] = useState(risks[0].impact);

  const score = riskScore(likelihood, impact);
  const band = riskBand(score);

  function pickThreat(i) {
    setIndex(i);
    setLikelihood(risks[i].likelihood);
    setImpact(risks[i].impact);
  }

  return (
    <div className="risk-tool">
      <form className="risk-form" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="threat">Threat</label>
          <select id="threat" value={index} onChange={(e) => pickThreat(Number(e.target.value))}>
            {risks.map((r, i) => (
              <option key={r.threat} value={i}>
                {r.threat}
              </option>
            ))}
          </select>
          <p className="field__hint">
            Each threat starts with our team&apos;s own rating. Change it to see how the priority moves.
          </p>
        </div>
        <LevelPicker name="likelihood" label="How likely is it?" value={likelihood} onChange={setLikelihood} />
        <LevelPicker name="impact" label="How much would it hurt?" value={impact} onChange={setImpact} />
      </form>

      <section className={`risk-result risk-result--${band.toLowerCase()}`} aria-live="polite">
        <h2 className="risk-result__threat">{risks[index].threat}</h2>
        <div className="risk-result__score">
          <span className="risk-result__number">{score}</span>
          <span className="risk-result__band">{band} priority</span>
        </div>
        <p className="risk-result__sum">
          Likelihood {likelihood} ({LEVELS.indexOf(likelihood) + 1}) × impact {impact} (
          {LEVELS.indexOf(impact) + 1}) = {score}
        </p>
        <p className="risk-result__advice">{BAND_ADVICE[band]}</p>

        <table className="matrix" aria-label="Risk matrix, impact across, likelihood down">
          <thead>
            <tr>
              <td />
              {LEVELS.map((i) => (
                <th key={i} scope="col">
                  {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...LEVELS].reverse().map((l) => (
              <tr key={l}>
                <th scope="row">{l}</th>
                {LEVELS.map((i) => {
                  const s = riskScore(l, i);
                  const on = l === likelihood && i === impact;
                  return (
                    <td
                      key={i}
                      className={`matrix__cell matrix__cell--${riskBand(s).toLowerCase()}${on ? " is-on" : ""}`}
                      aria-current={on ? "true" : undefined}
                    >
                      {s}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="matrix__caption">Impact runs across, likelihood runs up.</p>
      </section>
    </div>
  );
}
