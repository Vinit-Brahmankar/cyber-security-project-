// Turns a policy body string into paragraphs and bullet lists.
// Blocks are separated by a blank line; lines starting with "- " become list items.
export default function PolicyBody({ text }) {
  const blocks = text.split(/\n\s*\n/);

  return blocks.map((block, i) => {
    const lines = block.split("\n");
    const intro = lines.filter((l) => !l.startsWith("- "));
    const items = lines.filter((l) => l.startsWith("- ")).map((l) => l.slice(2));

    return (
      <div key={i} className="policy-block">
        {intro.length > 0 && <p>{intro.join(" ")}</p>}
        {items.length > 0 && (
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  });
}
