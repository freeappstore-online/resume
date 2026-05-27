import type { ResumeData } from "../lib/types";
import {
  createEmptyResume,
  exportResumeAsJson,
  importResumeFromJson,
} from "../lib/storage";
import { useRef } from "react";

interface ResumeManagerProps {
  resumes: ResumeData[];
  activeId: string;
  onSwitch: (id: string) => void;
  onAdd: (resume: ResumeData) => void;
  onDelete: (id: string) => void;
  onImport: (resume: ResumeData) => void;
}

export default function ResumeManager({
  resumes,
  activeId,
  onSwitch,
  onAdd,
  onDelete,
  onImport,
}: ResumeManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleNew() {
    const name = prompt("Resume name:");
    if (!name) return;
    onAdd(createEmptyResume(name));
  }

  function handleExport() {
    const active = resumes.find((r) => r.id === activeId);
    if (!active) return;
    const json = exportResumeAsJson(active);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${active.name.replace(/\s+/g, "-").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      if (typeof text !== "string") return;
      const resume = importResumeFromJson(text);
      if (resume) {
        onImport(resume);
      } else {
        alert("Invalid resume JSON file.");
      }
    };
    reader.readAsText(file);
    // Reset so same file can be imported again
    e.target.value = "";
  }

  const btnCls = "px-3 py-1.5 rounded-lg text-xs font-medium";

  return (
    <div
      className="flex flex-wrap items-center gap-2 p-3 rounded-xl"
      style={{
        background: "var(--panel)",
        border: "1px solid var(--line)",
      }}
    >
      <select
        className="rounded-lg px-3 py-1.5 text-sm outline-none flex-1 min-w-[120px]"
        style={{
          background: "var(--paper)",
          color: "var(--ink)",
          border: "1px solid var(--line)",
        }}
        value={activeId}
        onChange={(e) => onSwitch(e.target.value)}
      >
        {resumes.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleNew}
        className={btnCls}
        style={{
          background: "var(--accent)",
          color: "#fff",
        }}
      >
        New
      </button>

      {resumes.length > 1 && (
        <button
          type="button"
          onClick={() => {
            if (confirm("Delete this resume?")) onDelete(activeId);
          }}
          className={btnCls}
          style={{
            background: "transparent",
            color: "var(--error)",
            border: "1px solid var(--line)",
          }}
        >
          Delete
        </button>
      )}

      <button
        type="button"
        onClick={handleExport}
        className={btnCls}
        style={{
          background: "transparent",
          color: "var(--ink)",
          border: "1px solid var(--line)",
        }}
      >
        Export JSON
      </button>

      <button
        type="button"
        onClick={handleImportClick}
        className={btnCls}
        style={{
          background: "transparent",
          color: "var(--ink)",
          border: "1px solid var(--line)",
        }}
      >
        Import JSON
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
