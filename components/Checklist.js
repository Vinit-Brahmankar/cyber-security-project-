"use client";

import { useState } from "react";

export default function Checklist({ items }) {
  // State lives only in this page: refreshing starts over and nothing is saved.
  const [checked, setChecked] = useState(() => items.map(() => false));
  const passed = checked.filter(Boolean).length;
  const total = items.length;

  function toggle(i) {
    setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)));
  }

  return (
    <div className="checklist">
      <div className="checklist__status" aria-live="polite">
        <p className="checklist__score">
          <strong>{passed}</strong> of {total} passed
        </p>
        <div
          className="meter"
          role="progressbar"
          aria-label="Checks passed"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={passed}
        >
          <div className="meter__fill" style={{ width: `${(passed / total) * 100}%` }} />
        </div>
        <button type="button" className="button" onClick={() => setChecked(items.map(() => false))}>
          Reset
        </button>
      </div>

      <ul className="checklist__list">
        {items.map((entry, i) => (
          <li key={entry.item}>
            <label className={`check${checked[i] ? " is-checked" : ""}`}>
              <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} />
              <span>{entry.item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
