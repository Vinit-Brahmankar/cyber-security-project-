// Temporary page body used until each page is built in phase 4.
export default function Placeholder({ title, lede }) {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>{title}</h1>
        <p className="page-head__lede">{lede}</p>
      </header>
      <p className="placeholder-note">This page is built after the design is approved.</p>
    </div>
  );
}
