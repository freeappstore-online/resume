import type { ExperienceEntry } from "../lib/types";
import SectionHeader from "./SectionHeader";

interface ExperienceFormProps {
  data: ExperienceEntry[];
  onChange: (data: ExperienceEntry[]) => void;
}

export default function ExperienceForm({
  data,
  onChange,
}: ExperienceFormProps) {
  function addEntry() {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        isPresent: false,
        location: "",
        bullets: [""],
      },
    ]);
  }

  function updateEntry(index: number, updates: Partial<ExperienceEntry>) {
    onChange(data.map((e, i) => (i === index ? { ...e, ...updates } : e)));
  }

  function removeEntry(index: number) {
    onChange(data.filter((_, i) => i !== index));
  }

  function addBullet(entryIndex: number) {
    const entry = data[entryIndex];
    if (!entry) return;
    updateEntry(entryIndex, { bullets: [...entry.bullets, ""] });
  }

  function updateBullet(entryIndex: number, bulletIndex: number, value: string) {
    const entry = data[entryIndex];
    if (!entry) return;
    const bullets = entry.bullets.map((b, i) => (i === bulletIndex ? value : b));
    updateEntry(entryIndex, { bullets });
  }

  function removeBullet(entryIndex: number, bulletIndex: number) {
    const entry = data[entryIndex];
    if (!entry) return;
    updateEntry(entryIndex, {
      bullets: entry.bullets.filter((_, i) => i !== bulletIndex),
    });
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
      <SectionHeader title="Experience" sectionKey="experience" />
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
                Position {idx + 1}
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
                placeholder="Company"
                value={entry.company}
                onChange={(e) => updateEntry(idx, { company: e.target.value })}
              />
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="Position"
                value={entry.position}
                onChange={(e) => updateEntry(idx, { position: e.target.value })}
              />
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="Start Date (e.g. Jan 2022)"
                value={entry.startDate}
                onChange={(e) =>
                  updateEntry(idx, { startDate: e.target.value })
                }
              />
              <div className="flex items-center gap-2">
                <input
                  className={`${inputCls} flex-1`}
                  style={inputStyle}
                  placeholder="End Date"
                  value={entry.isPresent ? "Present" : entry.endDate}
                  disabled={entry.isPresent}
                  onChange={(e) =>
                    updateEntry(idx, { endDate: e.target.value })
                  }
                />
                <label className="flex items-center gap-1 text-xs whitespace-nowrap" style={{ color: "var(--muted)" }}>
                  <input
                    type="checkbox"
                    checked={entry.isPresent}
                    onChange={(e) =>
                      updateEntry(idx, {
                        isPresent: e.target.checked,
                        endDate: e.target.checked ? "" : entry.endDate,
                      })
                    }
                  />
                  Present
                </label>
              </div>
              <div className="sm:col-span-2">
                <input
                  className={inputCls}
                  style={inputStyle}
                  placeholder="Location"
                  value={entry.location}
                  onChange={(e) =>
                    updateEntry(idx, { location: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <span className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>
                Bullet Points
              </span>
              <div className="space-y-2">
                {entry.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex gap-2">
                    <input
                      className={`${inputCls} flex-1`}
                      style={inputStyle}
                      placeholder="Describe an achievement or responsibility..."
                      value={bullet}
                      onChange={(e) =>
                        updateBullet(idx, bIdx, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(idx, bIdx)}
                      className="text-xs px-2 rounded"
                      style={{ color: "var(--error)" }}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addBullet(idx)}
                className="mt-2 text-xs font-medium"
                style={{ color: "var(--accent)" }}
              >
                + Add Bullet
              </button>
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
        + Add Experience
      </button>
    </div>
  );
}
