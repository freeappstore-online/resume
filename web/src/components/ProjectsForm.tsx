import type { ProjectEntry } from "../lib/types";
import SectionHeader from "./SectionHeader";

interface ProjectsFormProps {
  data: ProjectEntry[];
  onChange: (data: ProjectEntry[]) => void;
}

export default function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  function addEntry() {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        name: "",
        description: "",
        technologies: "",
        url: "",
      },
    ]);
  }

  function updateEntry(index: number, updates: Partial<ProjectEntry>) {
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
      <SectionHeader title="Projects" sectionKey="projects" />
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
                Project {idx + 1}
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
                placeholder="Project Name"
                value={entry.name}
                onChange={(e) => updateEntry(idx, { name: e.target.value })}
              />
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="URL (optional)"
                value={entry.url}
                onChange={(e) => updateEntry(idx, { url: e.target.value })}
              />
              <div className="sm:col-span-2">
                <textarea
                  className={`${inputCls} resize-y`}
                  style={inputStyle}
                  placeholder="Description"
                  rows={2}
                  value={entry.description}
                  onChange={(e) =>
                    updateEntry(idx, { description: e.target.value })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  className={inputCls}
                  style={inputStyle}
                  placeholder="Technologies (e.g. React, Node.js, PostgreSQL)"
                  value={entry.technologies}
                  onChange={(e) =>
                    updateEntry(idx, { technologies: e.target.value })
                  }
                />
              </div>
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
        + Add Project
      </button>
    </div>
  );
}
