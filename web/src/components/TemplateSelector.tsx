import type { TemplateStyle } from "../lib/types";

interface TemplateSelectorProps {
  value: TemplateStyle;
  onChange: (template: TemplateStyle) => void;
}

const templates: { key: TemplateStyle; label: string; description: string }[] = [
  {
    key: "classic",
    label: "Classic",
    description: "Traditional layout with serif headings",
  },
  {
    key: "modern",
    label: "Modern",
    description: "Colored sidebar with clean sans-serif",
  },
  {
    key: "minimal",
    label: "Minimal",
    description: "Clean whitespace, subtle typography",
  },
];

export default function TemplateSelector({
  value,
  onChange,
}: TemplateSelectorProps) {
  return (
    <div>
      <h3
        className="text-sm font-semibold uppercase tracking-wide mb-3"
        style={{ color: "var(--ink)" }}
      >
        Template
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {templates.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className="rounded-lg px-3 py-2.5 text-left transition-all"
            style={{
              background:
                value === t.key ? "var(--accent)" : "var(--panel)",
              color: value === t.key ? "#fff" : "var(--ink)",
              border: `1px solid ${value === t.key ? "var(--accent)" : "var(--line)"}`,
            }}
          >
            <div className="text-xs font-semibold">{t.label}</div>
            <div
              className="text-[10px] mt-0.5"
              style={{
                opacity: value === t.key ? 0.85 : 0.6,
              }}
            >
              {t.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
