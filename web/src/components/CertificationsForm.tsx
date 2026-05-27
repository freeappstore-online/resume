import type { CertificationEntry } from "../lib/types";
import SectionHeader from "./SectionHeader";

interface CertificationsFormProps {
  data: CertificationEntry[];
  onChange: (data: CertificationEntry[]) => void;
}

export default function CertificationsForm({
  data,
  onChange,
}: CertificationsFormProps) {
  function addEntry() {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        name: "",
        issuer: "",
        date: "",
        credentialId: "",
      },
    ]);
  }

  function updateEntry(index: number, updates: Partial<CertificationEntry>) {
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
      <SectionHeader title="Certifications" sectionKey="certifications" />
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
                Certification {idx + 1}
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
                placeholder="Certification Name"
                value={entry.name}
                onChange={(e) => updateEntry(idx, { name: e.target.value })}
              />
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="Issuing Organization"
                value={entry.issuer}
                onChange={(e) => updateEntry(idx, { issuer: e.target.value })}
              />
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="Date Obtained"
                value={entry.date}
                onChange={(e) => updateEntry(idx, { date: e.target.value })}
              />
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="Credential ID (optional)"
                value={entry.credentialId}
                onChange={(e) =>
                  updateEntry(idx, { credentialId: e.target.value })
                }
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
        + Add Certification
      </button>
    </div>
  );
}
