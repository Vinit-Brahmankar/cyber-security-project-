import items from "@/data/checklist.json";
import Checklist from "@/components/Checklist";

export const metadata = { title: "Security checklist" };

export default function ChecklistPage() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Security checklist</h1>
        <p className="page-head__lede">
          Tick each check that is true for us today. We run this every quarter, and every item
          that fails gets an owner and a date to fix it.
        </p>
        <p className="page-head__meta">
          Results are self-reported and nothing is saved. Refreshing the page starts over.
        </p>
      </header>

      <Checklist items={items} />
    </div>
  );
}
