import { useState, useEffect, useCallback } from "react";
import type {
  ResumeData,
  SectionConfig,
  SectionKey,
  TemplateStyle,
  PersonalInfo,
  ExperienceEntry,
  EducationEntry,
  SkillEntry,
  ProjectEntry,
  CertificationEntry,
  LanguageEntry,
} from "./lib/types";
import {
  loadAllResumes,
  saveAllResumes,
  getActiveResumeId,
  setActiveResumeId,
  createEmptyResume,
} from "./lib/storage";
import ResumeManager from "./components/ResumeManager";
import PersonalForm from "./components/PersonalForm";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import SkillsForm from "./components/SkillsForm";
import ProjectsForm from "./components/ProjectsForm";
import CertificationsForm from "./components/CertificationsForm";
import LanguagesForm from "./components/LanguagesForm";
import SectionManager from "./components/SectionManager";
import TemplateSelector from "./components/TemplateSelector";
import ExportBar from "./components/ExportBar";
import ResumePreview from "./components/ResumePreview";

type MobileView = "form" | "preview";

export default function App() {
  const [resumes, setResumes] = useState<ResumeData[]>(() => {
    const loaded = loadAllResumes();
    if (loaded.length > 0) return loaded;
    const initial = createEmptyResume("My Resume");
    return [initial];
  });

  const [activeId, setActiveId] = useState<string>(() => {
    const saved = getActiveResumeId();
    if (saved && resumes.some((r) => r.id === saved)) return saved;
    return resumes[0]?.id ?? "";
  });

  const [mobileView, setMobileView] = useState<MobileView>("form");

  const activeResume = resumes.find((r) => r.id === activeId) ?? resumes[0];

  // Auto-save
  const save = useCallback(
    (updated: ResumeData[]) => {
      setResumes(updated);
      saveAllResumes(updated);
    },
    [],
  );

  // Persist active id
  useEffect(() => {
    setActiveResumeId(activeId);
  }, [activeId]);

  function updateActive(partial: Partial<ResumeData>) {
    if (!activeResume) return;
    const updated = resumes.map((r) =>
      r.id === activeResume.id
        ? { ...r, ...partial, updatedAt: new Date().toISOString() }
        : r,
    );
    save(updated);
  }

  function handleSwitch(id: string) {
    setActiveId(id);
  }

  function handleAdd(resume: ResumeData) {
    const updated = [...resumes, resume];
    save(updated);
    setActiveId(resume.id);
  }

  function handleDelete(id: string) {
    const updated = resumes.filter((r) => r.id !== id);
    save(updated);
    if (updated[0]) {
      setActiveId(updated[0].id);
    }
  }

  function handleImport(resume: ResumeData) {
    const updated = [...resumes, resume];
    save(updated);
    setActiveId(resume.id);
  }

  if (!activeResume) return null;

  function renderFormSection(key: SectionKey) {
    if (!activeResume) return null;
    switch (key) {
      case "personal":
        return (
          <PersonalForm
            key={key}
            data={activeResume.personal}
            onChange={(personal: PersonalInfo) => updateActive({ personal })}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            key={key}
            data={activeResume.experience}
            onChange={(experience: ExperienceEntry[]) =>
              updateActive({ experience })
            }
          />
        );
      case "education":
        return (
          <EducationForm
            key={key}
            data={activeResume.education}
            onChange={(education: EducationEntry[]) =>
              updateActive({ education })
            }
          />
        );
      case "skills":
        return (
          <SkillsForm
            key={key}
            data={activeResume.skills}
            onChange={(skills: SkillEntry[]) => updateActive({ skills })}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            key={key}
            data={activeResume.projects}
            onChange={(projects: ProjectEntry[]) => updateActive({ projects })}
          />
        );
      case "certifications":
        return (
          <CertificationsForm
            key={key}
            data={activeResume.certifications}
            onChange={(certifications: CertificationEntry[]) =>
              updateActive({ certifications })
            }
          />
        );
      case "languages":
        return (
          <LanguagesForm
            key={key}
            data={activeResume.languages}
            onChange={(languages: LanguageEntry[]) =>
              updateActive({ languages })
            }
          />
        );
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      {/* Header - hidden during print */}
      <header
        className="no-print sticky top-0 z-40 backdrop-blur-md px-4 py-3"
        style={{
          background: "var(--glass)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1
              className="text-base font-bold"
              style={{ color: "var(--ink)" }}
            >
              Resume Builder
            </h1>
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded"
              style={{
                background: "var(--accent)",
                color: "#fff",
              }}
            >
              FreeAppStore
            </span>
          </div>

          {/* Mobile toggle */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() =>
                setMobileView(mobileView === "form" ? "preview" : "form")
              }
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{
                background: "var(--accent)",
                color: "#fff",
              }}
            >
              {mobileView === "form" ? "Preview" : "Edit"}
            </button>
          </div>

          <div className="hidden lg:block">
            <ExportBar data={activeResume} />
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="no-print max-w-[1600px] mx-auto px-4 py-4">
        {/* Resume manager */}
        <div className="mb-4">
          <ResumeManager
            resumes={resumes}
            activeId={activeId}
            onSwitch={handleSwitch}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onImport={handleImport}
          />
        </div>

        {/* Split layout */}
        <div className="flex gap-4">
          {/* Form panel */}
          <div
            className={`w-full lg:w-1/2 xl:w-[45%] flex-shrink-0 space-y-6 ${
              mobileView === "preview" ? "hidden lg:block" : ""
            }`}
          >
            {/* Template selector */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
              }}
            >
              <TemplateSelector
                value={activeResume.template}
                onChange={(template: TemplateStyle) =>
                  updateActive({ template })
                }
              />
            </div>

            {/* Section manager */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
              }}
            >
              <SectionManager
                sections={activeResume.sectionOrder}
                onChange={(sectionOrder: SectionConfig[]) =>
                  updateActive({ sectionOrder })
                }
              />
            </div>

            {/* Form sections in order */}
            {activeResume.sectionOrder
              .filter((s) => s.visible)
              .map((section) => (
                <div
                  key={section.key}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                  }}
                >
                  {renderFormSection(section.key)}
                </div>
              ))}

            {/* Mobile export bar */}
            <div className="lg:hidden pb-4">
              <ExportBar data={activeResume} />
            </div>
          </div>

          {/* Preview panel */}
          <div
            className={`w-full lg:w-1/2 xl:w-[55%] ${
              mobileView === "form" ? "hidden lg:block" : ""
            }`}
          >
            <div className="lg:sticky lg:top-[60px]">
              <div
                className="rounded-xl overflow-hidden shadow-lg"
                style={{
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  id="resume-preview-content"
                  className="resume-preview-wrapper bg-white"
                  style={{ minHeight: "800px" }}
                >
                  <ResumePreview data={activeResume} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only: full-width resume */}
      <div className="print-only">
        <div id="resume-print-content" className="resume-preview-wrapper">
          <ResumePreview data={activeResume} />
        </div>
      </div>
    </div>
  );
}
