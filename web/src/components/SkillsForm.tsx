import type { SkillEntry, SkillLevel, SkillCategory } from "../lib/types";
import SectionHeader from "./SectionHeader";

interface SkillsFormProps {
  data: SkillEntry[];
  onChange: (data: SkillEntry[]) => void;
}

const levels: SkillLevel[] = ["beginner", "intermediate", "advanced", "expert"];
const categories: SkillCategory[] = ["Technical", "Languages", "Soft Skills"];

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  function addEntry() {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        name: "",
        level: "intermediate",
        category: "Technical",
      },
    ]);
  }

  function updateEntry(index: number, updates: Partial<SkillEntry>) {
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
      <SectionHeader title="Skills" sectionKey="skills" />
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
              placeholder="Skill name"
              value={entry.name}
              onChange={(e) => updateEntry(idx, { name: e.target.value })}
            />
            <select
              className={selectCls}
              style={inputStyle}
              value={entry.level}
              onChange={(e) =>
                updateEntry(idx, { level: e.target.value as SkillLevel })
              }
            >
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </option>
              ))}
            </select>
            <select
              className={selectCls}
              style={inputStyle}
              value={entry.category}
              onChange={(e) =>
                updateEntry(idx, {
                  category: e.target.value as SkillCategory,
                })
              }
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
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
        + Add Skill
      </button>
    </div>
  );
}
