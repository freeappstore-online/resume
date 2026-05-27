import type { ResumeData, SectionKey, SkillCategory } from "../lib/types";

interface MinimalTemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  const visibleSections = data.sectionOrder
    .filter((s) => s.visible)
    .map((s) => s.key);

  const { personal } = data;

  function sectionHeading(text: string) {
    return (
      <h2
        style={{
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "3px",
          color: "#999",
          marginBottom: "14px",
        }}
      >
        {text}
      </h2>
    );
  }

  function renderSection(key: SectionKey) {
    switch (key) {
      case "personal":
        return null;
      case "experience":
        return data.experience.length > 0 ? (
          <div key={key} style={{ marginBottom: "28px" }}>
            {sectionHeading("Experience")}
            {data.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "18px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#222" }}>
                      {exp.position}
                    </span>
                    {exp.company && (
                      <span style={{ fontSize: "13px", color: "#666", fontWeight: 400 }}>
                        {" "}at {exp.company}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: "11px", color: "#aaa", whiteSpace: "nowrap" }}>
                    {exp.startDate}
                    {(exp.endDate || exp.isPresent) && " — "}
                    {exp.isPresent ? "Present" : exp.endDate}
                  </span>
                </div>
                {exp.location && (
                  <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>
                    {exp.location}
                  </div>
                )}
                {exp.bullets.some((b) => b.trim()) && (
                  <ul
                    style={{
                      margin: "6px 0 0 0",
                      padding: "0 0 0 18px",
                      fontSize: "12px",
                      color: "#444",
                      lineHeight: 1.7,
                      listStyle: "none",
                    }}
                  >
                    {exp.bullets
                      .filter((b) => b.trim())
                      .map((b, i) => (
                        <li
                          key={i}
                          style={{
                            position: "relative",
                            paddingLeft: "0",
                          }}
                        >
                          <span style={{ position: "absolute", left: "-14px", color: "#ccc" }}>
                            -
                          </span>
                          {b}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;
      case "education":
        return data.education.length > 0 ? (
          <div key={key} style={{ marginBottom: "28px" }}>
            {sectionHeading("Education")}
            {data.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#222" }}>
                      {edu.degree}
                      {edu.field && `, ${edu.field}`}
                    </span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#aaa" }}>
                    {edu.graduationDate}
                  </span>
                </div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {edu.institution}
                </div>
                {(edu.gpa || edu.honors) && (
                  <div style={{ fontSize: "11px", color: "#999", marginTop: "2px" }}>
                    {edu.gpa && `GPA: ${edu.gpa}`}
                    {edu.gpa && edu.honors && " | "}
                    {edu.honors}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null;
      case "skills":
        return data.skills.length > 0 ? (
          <div key={key} style={{ marginBottom: "28px" }}>
            {sectionHeading("Skills")}
            {(["Technical", "Languages", "Soft Skills"] as SkillCategory[]).map(
              (cat) => {
                const catSkills = data.skills.filter((s) => s.category === cat);
                if (catSkills.length === 0) return null;
                return (
                  <div key={cat} style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "11px", color: "#999", fontWeight: 500 }}>
                      {cat}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginTop: "4px",
                      }}
                    >
                      {catSkills.map((s) => (
                        <span
                          key={s.id}
                          style={{
                            fontSize: "11px",
                            padding: "2px 10px",
                            border: "1px solid #e0e0e0",
                            borderRadius: "12px",
                            color: "#444",
                          }}
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              },
            )}
          </div>
        ) : null;
      case "projects":
        return data.projects.length > 0 ? (
          <div key={key} style={{ marginBottom: "28px" }}>
            {sectionHeading("Projects")}
            {data.projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#222" }}>
                    {proj.name}
                  </span>
                  {proj.url && (
                    <span style={{ fontSize: "11px", color: "#999" }}>
                      {proj.url}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ fontSize: "12px", color: "#555", marginTop: "3px", lineHeight: 1.6 }}>
                    {proj.description}
                  </div>
                )}
                {proj.technologies && (
                  <div style={{ fontSize: "11px", color: "#999", marginTop: "3px" }}>
                    {proj.technologies}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null;
      case "certifications":
        return data.certifications.length > 0 ? (
          <div key={key} style={{ marginBottom: "28px" }}>
            {sectionHeading("Certifications")}
            {data.certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "4px" }}>
                <div>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#222" }}>
                    {cert.name}
                  </span>
                  <span style={{ fontSize: "11px", color: "#888" }}>
                    {" "}by {cert.issuer}
                  </span>
                </div>
                <span style={{ fontSize: "11px", color: "#aaa" }}>{cert.date}</span>
              </div>
            ))}
          </div>
        ) : null;
      case "languages":
        return data.languages.length > 0 ? (
          <div key={key} style={{ marginBottom: "28px" }}>
            {sectionHeading("Languages")}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {data.languages.map((l) => (
                <div key={l.id} style={{ fontSize: "12px", color: "#444" }}>
                  <span style={{ fontWeight: 500 }}>{l.name}</span>
                  <span style={{ color: "#aaa", marginLeft: "4px", fontSize: "11px" }}>
                    {l.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null;
    }
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Manrope', system-ui, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "48px 48px",
        background: "white",
        color: "#333",
        lineHeight: 1.5,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        {personal.fullName && (
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 300,
              color: "#222",
              margin: "0 0 4px 0",
              letterSpacing: "-0.5px",
            }}
          >
            {personal.fullName}
          </h1>
        )}
        {personal.jobTitle && (
          <div style={{ fontSize: "14px", color: "#888", fontWeight: 400, marginBottom: "12px" }}>
            {personal.jobTitle}
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "11px",
            color: "#999",
          }}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && visibleSections.includes("personal") && (
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              fontSize: "13px",
              color: "#555",
              lineHeight: 1.8,
              margin: 0,
              maxWidth: "600px",
            }}
          >
            {personal.summary}
          </p>
        </div>
      )}

      {/* Thin divider */}
      <div
        style={{
          borderTop: "1px solid #eee",
          marginBottom: "28px",
        }}
      />

      {/* Sections */}
      {visibleSections
        .filter((k) => k !== "personal")
        .map((key) => renderSection(key))}
    </div>
  );
}
