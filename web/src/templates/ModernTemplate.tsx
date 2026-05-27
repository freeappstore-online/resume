import type { ResumeData, SectionKey, SkillCategory, SkillLevel } from "../lib/types";

interface ModernTemplateProps {
  data: ResumeData;
}

function SkillBar({ level }: { level: SkillLevel }) {
  const pct =
    level === "beginner"
      ? 25
      : level === "intermediate"
        ? 50
        : level === "advanced"
          ? 75
          : 100;
  return (
    <div
      style={{
        width: "100%",
        height: "4px",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "2px",
        marginTop: "3px",
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: "white",
          borderRadius: "2px",
        }}
      />
    </div>
  );
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const visibleSections = data.sectionOrder
    .filter((s) => s.visible)
    .map((s) => s.key);

  const { personal } = data;
  const accentColor = "#2563eb";

  // Sidebar sections: personal contact, skills, languages, certifications
  const sidebarKeys: SectionKey[] = ["skills", "languages", "certifications"];
  const mainKeys = visibleSections.filter(
    (k) => k !== "personal" && !sidebarKeys.includes(k),
  );
  const visibleSidebar = sidebarKeys.filter((k) => visibleSections.includes(k));

  function renderMainSection(key: SectionKey) {
    switch (key) {
      case "experience":
        return data.experience.length > 0 ? (
          <div key={key} style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: accentColor,
                marginBottom: "12px",
                borderBottom: `1px solid ${accentColor}`,
                paddingBottom: "4px",
              }}
            >
              Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", color: "#111" }}>
                    {exp.position}
                  </strong>
                  <span style={{ fontSize: "10px", color: "#888", fontWeight: 500 }}>
                    {exp.startDate}
                    {(exp.endDate || exp.isPresent) && " - "}
                    {exp.isPresent ? "Present" : exp.endDate}
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: "#555", marginBottom: "4px" }}>
                  {exp.company}
                  {exp.location && ` | ${exp.location}`}
                </div>
                {exp.bullets.some((b) => b.trim()) && (
                  <ul style={{ margin: "4px 0 0 16px", padding: 0, fontSize: "11px", color: "#333", lineHeight: 1.6 }}>
                    {exp.bullets
                      .filter((b) => b.trim())
                      .map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;
      case "education":
        return data.education.length > 0 ? (
          <div key={key} style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: accentColor,
                marginBottom: "12px",
                borderBottom: `1px solid ${accentColor}`,
                paddingBottom: "4px",
              }}
            >
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "10px" }}>
                <strong style={{ fontSize: "12px", color: "#111" }}>
                  {edu.degree}
                  {edu.field && ` in ${edu.field}`}
                </strong>
                <div style={{ fontSize: "11px", color: "#555" }}>
                  {edu.institution} {edu.graduationDate && `| ${edu.graduationDate}`}
                </div>
                {(edu.gpa || edu.honors) && (
                  <div style={{ fontSize: "10px", color: "#666", marginTop: "1px" }}>
                    {edu.gpa && `GPA: ${edu.gpa}`}
                    {edu.gpa && edu.honors && " | "}
                    {edu.honors}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null;
      case "projects":
        return data.projects.length > 0 ? (
          <div key={key} style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: accentColor,
                marginBottom: "12px",
                borderBottom: `1px solid ${accentColor}`,
                paddingBottom: "4px",
              }}
            >
              Projects
            </h2>
            {data.projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                  <strong style={{ fontSize: "12px", color: "#111" }}>
                    {proj.name}
                  </strong>
                  {proj.url && (
                    <span style={{ fontSize: "10px", color: accentColor }}>{proj.url}</span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ fontSize: "11px", color: "#444", marginTop: "2px" }}>{proj.description}</div>
                )}
                {proj.technologies && (
                  <div style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>{proj.technologies}</div>
                )}
              </div>
            ))}
          </div>
        ) : null;
      default:
        return null;
    }
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Manrope', system-ui, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        background: "white",
        color: "#333",
        display: "flex",
        minHeight: "100%",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          flexShrink: 0,
          background: accentColor,
          color: "white",
          padding: "32px 20px",
        }}
      >
        {/* Name & Title */}
        <div style={{ marginBottom: "24px" }}>
          {personal.fullName && (
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 800,
                margin: "0 0 4px 0",
                lineHeight: 1.2,
              }}
            >
              {personal.fullName}
            </h1>
          )}
          {personal.jobTitle && (
            <div
              style={{
                fontSize: "11px",
                opacity: 0.85,
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: 600,
              }}
            >
              {personal.jobTitle}
            </div>
          )}
        </div>

        {/* Contact */}
        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "8px",
              opacity: 0.7,
              fontWeight: 700,
            }}
          >
            Contact
          </h3>
          <div style={{ fontSize: "11px", lineHeight: 1.8, opacity: 0.9 }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.website && <div>{personal.website}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
          </div>
        </div>

        {/* Skills in sidebar */}
        {visibleSidebar.includes("skills") && data.skills.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "10px",
                opacity: 0.7,
                fontWeight: 700,
              }}
            >
              Skills
            </h3>
            {(["Technical", "Languages", "Soft Skills"] as SkillCategory[]).map((cat) => {
              const catSkills = data.skills.filter((s) => s.category === cat);
              if (catSkills.length === 0) return null;
              return (
                <div key={cat} style={{ marginBottom: "10px" }}>
                  <div style={{ fontSize: "10px", opacity: 0.7, marginBottom: "4px", fontWeight: 600 }}>
                    {cat}
                  </div>
                  {catSkills.map((s) => (
                    <div key={s.id} style={{ marginBottom: "4px" }}>
                      <div style={{ fontSize: "11px", opacity: 0.9 }}>{s.name}</div>
                      <SkillBar level={s.level} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Languages in sidebar */}
        {visibleSidebar.includes("languages") && data.languages.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "8px",
                opacity: 0.7,
                fontWeight: 700,
              }}
            >
              Languages
            </h3>
            {data.languages.map((l) => (
              <div key={l.id} style={{ fontSize: "11px", opacity: 0.9, marginBottom: "3px" }}>
                {l.name}{" "}
                <span style={{ opacity: 0.6, fontSize: "10px" }}>
                  ({l.proficiency})
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Certifications in sidebar */}
        {visibleSidebar.includes("certifications") && data.certifications.length > 0 && (
          <div>
            <h3
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "8px",
                opacity: 0.7,
                fontWeight: 700,
              }}
            >
              Certifications
            </h3>
            {data.certifications.map((c) => (
              <div key={c.id} style={{ marginBottom: "6px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, opacity: 0.95 }}>
                  {c.name}
                </div>
                <div style={{ fontSize: "10px", opacity: 0.7 }}>
                  {c.issuer} {c.date && `| ${c.date}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "32px 28px" }}>
        {/* Summary */}
        {personal.summary && visibleSections.includes("personal") && (
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: accentColor,
                marginBottom: "8px",
                borderBottom: `1px solid ${accentColor}`,
                paddingBottom: "4px",
              }}
            >
              About Me
            </h2>
            <p style={{ fontSize: "11px", color: "#555", lineHeight: 1.7, margin: 0 }}>
              {personal.summary}
            </p>
          </div>
        )}

        {mainKeys.map((key) => renderMainSection(key))}
      </div>
    </div>
  );
}
