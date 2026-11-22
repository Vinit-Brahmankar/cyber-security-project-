"use client";

import { useEffect, useState } from "react";

// Sidebar table of contents. Highlights the section currently in view.
export default function PolicyContents({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const list = (
    <ol className="contents__list">
      {sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            aria-current={active === s.id ? "true" : undefined}
            onClick={() => setActive(s.id)}
          >
            <span className="contents__num">{i + 1}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <aside className="contents" aria-label="Policy contents">
      <details className="contents__mobile">
        <summary>Contents</summary>
        {list}
      </details>
      <div className="contents__desktop">
        <h2 className="contents__heading">Contents</h2>
        {list}
      </div>
    </aside>
  );
}
