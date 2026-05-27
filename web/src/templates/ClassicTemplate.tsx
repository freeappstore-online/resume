import type { ResumeData, SectionKey, SkillCategory } from "../lib/types";

interface ClassicTemplateProps {
  data: ResumeData;
}

export default function ClassicTemplate({ data }: ClassicTemplateProps) {
  const visibleSections = data.sectionOrder
    .filter((s) => s.visible)
    .map((s) => s.key);

  function renderSection(key: SectionKey) {
    switch (key) {
      case "personal":
        return null; // Personal is always rendered in the header
      case "experience":
        return data.experience.length > 0 ? (
          <div key={key}>
            <h2
              style={{
                fontFamily: "'Merriweather', Georgia, serif",
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                borderBottom: "2px solid #333",
                paddingBottom: "4px",
                marginBottom: "12px",
                color: "#333",
              }}
            >
              Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "14px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    gap: "4px",
                  }}
                >
                  <strong style={{ fontSize: "13px", color: "#111" }}>
                    {exp.position}
                  </strong>
                  <span style={{ fontSize: "11px", color: "#666" }}>
                    {exp.startDate}
                    {(exp.endDate || exp.isPresent) && " — "}
                    {exp.isPresent ? "Present" : exp.endDate}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#444",
                    fontStyle: "italic",
                    marginBottom: "4px",
                  }}
                >
                  {exp.company}
                  {exp.location && `, ${exp.location}`}
                </div>
                {exp.bullets.some((b) => b.trim()) && (
                  <ul
                    style={{
                      margin: "4px 0 0 18px",
                      padding: 0,
                      fontSize: "12px",
                      color: "#333",
                      lineHeight: 1.6,
                    }}
                  >
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
          <div key={key}>
            <h2
              style={{
                fontFamily: "'Merriweather', Georgia, serif",
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                borderBottom: "2px solid #333",
                paddingBottom: "4px",
                marginBottom: "12px",
                color: "#333",
              }}
            >
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    gap: "4px",
                  }}
                >
                  <strong style={{ fontSize: "13px", color: "#111" }}>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </strong>
                  <span style={{ fontSize: "11px", color: "#666" }}>
                    {edu.graduationDate}
                  </span>
                </div>
                <div style={{ fontSize: "12px", color: "#444", fontStyle: "italic" }}>
                  {edu.institution}
                </div>
                {(edu.gpa || edu.honors) && (
                  <div style={{ fontSize: "11px", color: "#555", marginTop: "2px" }}>
                    {edu.gpa && `GPA: ${edu.gpa}`}
                    {edu.gpa && edu.honors && " | "}
                    {edu.honors && edu.honors}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null;
      case "skills":
        return data.skills.length > 0 ? (
          <div key={key}>
            <h2
              style={{
                fontFamily: "'Merriweather', Georgia, serif",
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                borderBottom: "2px solid #333",
                paddingBottom: "4px",
                marginBottom: "12px",
                color: "#333",
              }}
            >
              Skills
            </h2>
            {(["Technical", "Languages", "Soft Skills"] as SkillCategory[]).map(
              (cat) => {
                const catSkills = data.skills.filter((s) => s.category === cat);
                if (catSkills.length === 0) return null;
                return (
                  <div key={cat} style={{ marginBottom: "8px" }}>
                    <strong style={{ fontSize: "12px", color: "#333" }}>
                      {cat}:
                    </strong>{" "}
                    <span style={{ fontSize: "12px", color: "#444" }}>
                      {catSkills
                        .map(
                          (s) =>
                            `${s.name} (${s.level})`,
                        )
                        .join(", ")}
                    </span>
                  </div>
                );
              },
            )}
          </div>
        ) : null;
      case "projects":
        return data.projects.length > 0 ? (
          <div key={key}>
            <h2
              style={{
                fontFamily: "'Merriweather', Georgia, serif",
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                borderBottom: "2px solid #333",
                paddingBottom: "4px",
                marginBottom: "12px",
                color: "#333",
              }}
            >
              Projects
            </h2>
            {data.projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                  <strong style={{ fontSize: "13px", color: "#111" }}>
                    {proj.name}
                  </strong>
                  {proj.url && (
                    <span style={{ fontSize: "11px", color: "#2563eb" }}>
                      {proj.url}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ fontSize: "12px", color: "#444", marginTop: "2px" }}>
                    {proj.description}
                  </div>
                )}
                {proj.technologies && (
                  <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
                    Technologies: {proj.technologies}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null;
      case "certifications":
        return data.certifications.length > 0 ? (
          <div key={key}>
            <h2
              style={{
                fontFamily: "'Merriweather', Georgia, serif",
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                borderBottom: "2px solid #333",
                paddingBottom: "4px",
                marginBottom: "12px",
                color: "#333",
              }}
            >
              Certifications
            </h2>
            {data.certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "4px" }}>
                  <strong style={{ fontSize: "12px", color: "#111" }}>
                    {cert.name}
                  </strong>
                  <span style={{ fontSize: "11px", color: "#666" }}>
                    {cert.date}
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: "#444" }}>
                  {cert.issuer}
                  {cert.credentialId && ` — ID: ${cert.credentialId}`}
                </div>
              </div>
            ))}
          </div>
        ) : null;
      case "languages":
        return data.languages.length > 0 ? (
          <div key={key}>
            <h2
              style={{
                fontFamily: "'Merriweather', Georgia, serif",
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                borderBottom: "2px solid #333",
                paddingBottom: "4px",
                marginBottom: "12px",
                color: "#333",
              }}
            >
              Languages
            </h2>
            <div style={{ fontSize: "12px", color: "#444" }}>
              {data.languages
                .map((l) => `${l.name} (${l.proficiency})`)
                .join(" | ")}
            </div>
          </div>
        ) : null;
    }
  }

  const { personal } = data;
  const contactParts = [
    personal.email,
    personal.phone,
    personal.location,
  ].filter(Boolean);

  return (
    <div
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px",
        background: "white",
        color: "#333",
        lineHeight: 1.5,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        {personal.fullName && (
          <h1
            style={{
              fontFamily: "'Merriweather', Georgia, serif",
              fontSize: "28px",
              fontWeight: 700,
              color: "#111",
              margin: "0 0 4px 0",
              letterSpacing: "0.5px",
            }}
          >
            {personal.fullName}
          </h1>
        )}
        {personal.jobTitle && (
          <div
            style={{
              fontSize: "14px",
              color: "#555",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            {personal.jobTitle}
          </div>
        )}
        {contactParts.length > 0 && (
          <div style={{ fontSize: "11px", color: "#666" }}>
            {contactParts.join(" | ")}
          </div>
        )}
        {(personal.website || personal.linkedin) && (
          <div style={{ fontSize: "11px", color: "#2563eb", marginTop: "2px" }}>
            {[personal.website, personal.linkedin].filter(Boolean).join(" | ")}
          </div>
        )}
      </div>

      {/* Summary */}
      {personal.summary && visibleSections.includes("personal") && (
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontFamily: "'Merriweather', Georgia, serif",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              borderBottom: "2px solid #333",
              paddingBottom: "4px",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            Summary
          </h2>
          <p style={{ fontSize: "12px", color: "#444", lineHeight: 1.7, margin: 0 }}>
            {personal.summary}
          </p>
        </div>
      )}

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {visibleSections
          .filter((k) => k !== "personal")
          .map((key) => renderSection(key))}
      </div>
    </div>
  );
}
