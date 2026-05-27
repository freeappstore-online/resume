import type { LanguageEntry, LanguageProficiency } from "../lib/types";
import SectionHeader from "./SectionHeader";

interface LanguagesFormProps {
  data: LanguageEntry[];
  onChange: (data: LanguageEntry[]) => void;
}

const proficiencies: LanguageProficiency[] = [
  "native",
  "fluent",
  "intermediate",
  "basic",
];

export default function LanguagesForm({ data, onChange }: LanguagesFormProps) {
  function addEntry() {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        name: "",
        proficiency: "intermediate",
      },
    ]);
  }

  function updateEntry(index: number, updates: Partial<LanguageEntry>) {
    onChange(data.map((e, i) => (i === index ? { ...e, ...updates } : e)));
  }

  function removeEntry(index: number) {
    onChange(data.filter((_, i) => i !== index));
  }

  const inputCls = "w-full rounded-lg px-3 py-2 text-sm outline-none focus:ring-2";
  const selectCls = "rounded-lg px-3 py-2 text-sm outline-none focus:ring-2";
  const inputStyle = {
    background: "var(--paper)",
    color: "var(--ink)",
    border: "1px solid var(--line)",
    "--tw-ring-color": "var(--accent)",
  } as React.CSSProperties;

  return (
    <div>
      <SectionHeader title="Languages" sectionKey="languages" />
      <div className="space-y-3">
        {data.map((entry, idx) => (
          <div
            key={entry.id}
            className="flex flex-wrap gap-2 items-center rounded-lg p-3"
            style={{
              background: "var(--panel)",
              border: "1px solid var(--line)",
            }}
          >
            <input
              className={`${inputCls} flex-1 min-w-[140px]`}
              style={inputStyle}
              placeholder="Language"
              value={entry.name}
              onChange={(e) => updateEntry(idx, { name: e.target.value })}
            />
            <select
              className={selectCls}
              style={inputStyle}
              value={entry.proficiency}
              onChange={(e) =>
                updateEntry(idx, {
                  proficiency: e.target.value as LanguageProficiency,
                })
              }
            >
              {proficiencies.map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeEntry(idx)}
              className="text-xs px-2 py-1 rounded"
              style={{ color: "var(--error)" }}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addEntry}
        className="mt-3 w-full py-2 rounded-lg text-sm font-medium"
        style={{
          border: "1px dashed var(--line-strong)",
          color: "var(--accent)",
          background: "transparent",
        }}
      >
        + Add Language
      </button>
    </div>
  );
}
