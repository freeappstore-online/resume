import type { PersonalInfo } from "../lib/types";
import SectionHeader from "./SectionHeader";

interface PersonalFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  const inputStyle = {
    background: "var(--paper)",
    color: "var(--ink)",
    border: "1px solid var(--line)",
  };

  return (
    <label className="block">
      <span
        className="block text-xs font-medium mb-1"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 resize-y"
          style={{
            ...inputStyle,
            "--tw-ring-color": "var(--accent)",
          } as React.CSSProperties}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
          style={{
            ...inputStyle,
            "--tw-ring-color": "var(--accent)",
          } as React.CSSProperties}
        />
      )}
    </label>
  );
}

export default function PersonalForm({ data, onChange }: PersonalFormProps) {
  function update(key: keyof PersonalInfo, value: string) {
    onChange({ ...data, [key]: value });
  }

  return (
    <div>
      <SectionHeader title="Personal Info" sectionKey="personal" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field
          label="Full Name"
          value={data.fullName}
          onChange={(v) => update("fullName", v)}
          placeholder="John Doe"
        />
        <Field
          label="Job Title"
          value={data.jobTitle}
          onChange={(v) => update("jobTitle", v)}
          placeholder="Senior Software Engineer"
        />
        <Field
          label="Email"
          type="email"
          value={data.email}
          onChange={(v) => update("email", v)}
          placeholder="john@example.com"
        />
        <Field
          label="Phone"
          type="tel"
          value={data.phone}
          onChange={(v) => update("phone", v)}
          placeholder="+1 (555) 123-4567"
        />
        <Field
          label="Location"
          value={data.location}
          onChange={(v) => update("location", v)}
          placeholder="San Francisco, CA"
        />
        <Field
          label="Website / Portfolio URL"
          type="url"
          value={data.website}
          onChange={(v) => update("website", v)}
          placeholder="https://johndoe.dev"
        />
        <div className="sm:col-span-2">
          <Field
            label="LinkedIn URL"
            type="url"
            value={data.linkedin}
            onChange={(v) => update("linkedin", v)}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Summary / Objective"
            value={data.summary}
            onChange={(v) => update("summary", v)}
            placeholder="Experienced software engineer with 8+ years..."
            multiline
          />
        </div>
      </div>
    </div>
  );
}
