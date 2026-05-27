import type { SectionConfig } from "../lib/types";

interface SectionManagerProps {
  sections: SectionConfig[];
  onChange: (sections: SectionConfig[]) => void;
}

export default function SectionManager({
  sections,
  onChange,
}: SectionManagerProps) {
  function toggleVisibility(index: number) {
    onChange(
      sections.map((s, i) =>
        i === index ? { ...s, visible: !s.visible } : s,
      ),
    );
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const next = [...sections];
    const prev = next[index - 1];
    const curr = next[index];
    if (!prev || !curr) return;
    next[index - 1] = curr;
    next[index] = prev;
    onChange(next);
  }

  function moveDown(index: number) {
    if (index === sections.length - 1) return;
    const next = [...sections];
    const curr = next[index];
    const after = next[index + 1];
    if (!curr || !after) return;
    next[index] = after;
    next[index + 1] = curr;
    onChange(next);
  }

  return (
    <div>
      <h3
        className="text-sm font-semibold uppercase tracking-wide mb-3"
        style={{ color: "var(--ink)" }}
      >
        Section Order
      </h3>
      <div className="space-y-1.5">
        {sections.map((section, idx) => (
          <div
            key={section.key}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
            style={{
              background: "var(--panel)",
              border: "1px solid var(--line)",
              opacity: section.visible ? 1 : 0.5,
            }}
          >
            <div className="flex flex-col gap-0.5 mr-1">
              <button
                type="button"
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="text-[10px] leading-none disabled:opacity-30"
                style={{ color: "var(--muted)" }}
                aria-label={`Move ${section.label} up`}
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => moveDown(idx)}
                disabled={idx === sections.length - 1}
                className="text-[10px] leading-none disabled:opacity-30"
                style={{ color: "var(--muted)" }}
                aria-label={`Move ${section.label} down`}
              >
                ▼
              </button>
            </div>
            <span className="flex-1" style={{ color: "var(--ink)" }}>
              {section.label}
            </span>
            <label className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
              <input
                type="checkbox"
                checked={section.visible}
                onChange={() => toggleVisibility(idx)}
              />
              Show
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
