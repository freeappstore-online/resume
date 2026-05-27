import { useRef } from "react";
import type { ResumeData } from "../lib/types";
import { exportResumeAsHtml } from "../lib/storage";

interface ExportBarProps {
  data: ResumeData;
}

export default function ExportBar({ data }: ExportBarProps) {
  const previewRef = useRef<HTMLDivElement | null>(null);

  function handlePrint() {
    window.print();
  }

  function handleDownloadHtml() {
    // Get the preview HTML from the DOM
    const previewEl = document.getElementById("resume-preview-content");
    const previewHtml = previewEl?.innerHTML ?? "";
    const html = exportResumeAsHtml(data, previewHtml);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.personal.fullName || "resume"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const btnCls =
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors";

  return (
    <div ref={previewRef} className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={handlePrint}
        className={btnCls}
        style={{
          background: "var(--accent)",
          color: "#fff",
        }}
      >
        Print / Save as PDF
      </button>
      <button
        type="button"
        onClick={handleDownloadHtml}
        className={btnCls}
        style={{
          background: "transparent",
          color: "var(--ink)",
          border: "1px solid var(--line)",
        }}
      >
        Download HTML
      </button>
    </div>
  );
}
