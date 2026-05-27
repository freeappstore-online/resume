import type { SectionKey } from "./types";

export const sectionTips: Record<SectionKey, string> = {
  personal:
    "Include a professional email address. Your summary should be 2-3 sentences highlighting your key qualifications and career goals.",
  experience:
    "Start each bullet with a strong action verb. Quantify achievements where possible (e.g., 'Increased sales by 25%'). List most recent experience first.",
  education:
    "Include GPA only if it's above 3.5 or the employer specifically requests it. List relevant coursework if you have limited work experience.",
  skills:
    "Tailor skills to the job description. List your strongest and most relevant skills first. Be honest about proficiency levels.",
  projects:
    "Include 2-4 projects that demonstrate relevant skills. Link to live demos or repositories when possible.",
  certifications:
    "List certifications that are relevant to your target role. Include the credential ID if the employer may want to verify.",
  languages:
    "Only include languages you can comfortably use in a professional setting. Be honest about your proficiency level.",
};
