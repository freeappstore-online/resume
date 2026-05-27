export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  location: string;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa: string;
  honors: string;
}

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type SkillCategory = "Technical" | "Languages" | "Soft Skills";

export interface SkillEntry {
  id: string;
  name: string;
  level: SkillLevel;
  category: SkillCategory;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string;
  url: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
}

export type LanguageProficiency = "native" | "fluent" | "intermediate" | "basic";

export interface LanguageEntry {
  id: string;
  name: string;
  proficiency: LanguageProficiency;
}

export type SectionKey =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "languages";

export interface SectionConfig {
  key: SectionKey;
  label: string;
  visible: boolean;
}

export type TemplateStyle = "classic" | "modern" | "minimal";

export interface ResumeData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  template: TemplateStyle;
  sectionOrder: SectionConfig[];
  personal: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  languages: LanguageEntry[];
}
