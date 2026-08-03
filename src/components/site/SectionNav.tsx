type Item = { id: string; label: string };

export function SectionNav({ items }: { items: Item[] }) {
  return (
    <nav
      aria-label="Jump to section"
      className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur"
    >
      <ul className="mx-auto max-w-6xl flex gap-2 overflow-x-auto px-5 sm:px-8 py-3">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="inline-flex whitespace-nowrap rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
