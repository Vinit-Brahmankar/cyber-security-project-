import phases from "@/data/plan.json";

export const metadata = { title: "Project plan" };

const STATUS_LABEL = { done: "Done", "in progress": "In progress", "to do": "To do" };

function statusClass(status) {
  return `status status--${status.replace(" ", "-")}`;
}

export default function PlanPage() {
  const weeks = Math.max(...phases.map((p) => p.week));
  const done = phases.filter((p) => p.status === "done").length;

  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Project plan</h1>
        <p className="page-head__lede">
          How we built this portal in {phases.length} phases over {weeks} weeks, who owned each
          part and where it stands now.
        </p>
        <p className="page-head__meta">
          {done} of {phases.length} phases done. Person A and Person B stand in for the two team
          members.
        </p>
      </header>

      <ol className="timeline" aria-label="Timeline by week">
        {phases.map((p, i) => (
          <li key={p.phase} className={`timeline__step timeline__step--${p.status.replace(" ", "-")}`}>
            <span className="timeline__week">Week {p.week}</span>
            <span className="timeline__name">
              {i + 1}. {p.phase}
            </span>
          </li>
        ))}
      </ol>

      <ol className="phases">
        {phases.map((p, i) => (
          <li key={p.phase} className="phase">
            <div className="phase__head">
              <span className="phase__num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h2>{p.phase}</h2>
                <p className="phase__meta">
                  Week {p.week}
                  <span className={statusClass(p.status)}>{STATUS_LABEL[p.status] ?? p.status}</span>
                </p>
              </div>
            </div>
            <p className="phase__goal">{p.goal}</p>
            <ul className="tasks">
              {p.tasks.map((t) => (
                <li key={t.task}>
                  <span>{t.task}</span>
                  <span className="owner">{t.owner}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
