import type { EducationEntry } from "../lib/types";
import SectionHeader from "./SectionHeader";

interface EducationFormProps {
  data: EducationEntry[];
  onChange: (data: EducationEntry[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  function addEntry() {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        institution: "",
        degree: "",
        field: "",
        graduationDate: "",
        gpa: "",
        honors: "",
      },
    ]);
  }

  function updateEntry(index: number, updates: Partial<EducationEntry>) {
    onChange(data.map((e, i) => (i === index ? { ...e, ...updates } : e)));
  }

  function removeEntry(index: number) {
    onChange(data.filter((_, i) => i !== index));
  }

  const inputCls = "w-full rounded-lg px-3 py-2 text-sm outline-none focus:ring-2";
  const inputStyle = {
    background: "var(--paper)",
    color: "var(--ink)",
    border: "1px solid var(--line)",
    "--tw-ring-color": "var(--accent)",
  } as React.CSSProperties;

  return (
    <div>
      <SectionHeader title="Education" sectionKey="education" />
      <div className="space-y-4">
        {data.map((entry, idx) => (
          <div
            key={entry.id}
            className="rounded-xl p-4 space-y-3"
            style={{
              background: "var(--panel)",
              border: "1px solid var(--line)",
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                Education {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => removeEntry(idx)}
                className="text-xs font-medium px-2 py-1 rounded"
                style={{ color: "var(--error)" }}
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="Institution"
                value={entry.institution}
                onChange={(e) =>
                  updateEntry(idx, { institution: e.target.value })
                }
              />
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="Degree (e.g. Bachelor of Science)"
                value={entry.degree}
                onChange={(e) => updateEntry(idx, { degree: e.target.value })}
              />
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="Field of Study"
                value={entry.field}
                onChange={(e) => updateEntry(idx, { field: e.target.value })}
              />
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="Graduation Date"
                value={entry.graduationDate}
                onChange={(e) =>
                  updateEntry(idx, { graduationDate: e.target.value })
                }
              />
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="GPA (optional)"
                value={entry.gpa}
                onChange={(e) => updateEntry(idx, { gpa: e.target.value })}
              />
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="Honors (optional)"
                value={entry.honors}
                onChange={(e) => updateEntry(idx, { honors: e.target.value })}
              />
            </div>
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
        + Add Education
      </button>
    </div>
  );
}
