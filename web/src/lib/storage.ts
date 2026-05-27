import type { ResumeData, SectionConfig } from "./types";

const STORAGE_KEY = "resume-builder-data";
const ACTIVE_KEY = "resume-builder-active";

export const defaultSectionOrder: SectionConfig[] = [
  { key: "personal", label: "Personal Info", visible: true },
  { key: "experience", label: "Experience", visible: true },
  { key: "education", label: "Education", visible: true },
  { key: "skills", label: "Skills", visible: true },
  { key: "projects", label: "Projects", visible: true },
  { key: "certifications", label: "Certifications", visible: true },
  { key: "languages", label: "Languages", visible: true },
];

export function createEmptyResume(name: string): ResumeData {
  return {
    id: crypto.randomUUID(),
    name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    template: "classic",
    sectionOrder: defaultSectionOrder.map((s) => ({ ...s })),
    personal: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
  };
}

export function loadAllResumes(): ResumeData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as ResumeData[];
  } catch {
    return [];
  }
}

export function saveAllResumes(resumes: ResumeData[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
}

export function getActiveResumeId(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function setActiveResumeId(id: string): void {
  localStorage.setItem(ACTIVE_KEY, id);
}

export function exportResumeAsJson(resume: ResumeData): string {
  return JSON.stringify(resume, null, 2);
}

export function importResumeFromJson(json: string): ResumeData | null {
  try {
    const parsed: unknown = JSON.parse(json);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "personal" in parsed &&
      "experience" in parsed
    ) {
      const resume = parsed as ResumeData;
      // Assign new id so it doesn't collide
      return { ...resume, id: crypto.randomUUID() };
    }
    return null;
  } catch {
    return null;
  }
}

export function exportResumeAsHtml(
  resume: ResumeData,
  previewHtml: string,
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${resume.personal.fullName || "Resume"}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Merriweather:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #fff; }
  </style>
</head>
<body>
${previewHtml}
</body>
</html>`;
}
