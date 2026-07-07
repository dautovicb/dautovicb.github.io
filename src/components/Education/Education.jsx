import "./Education.css";

const education = [
  {
    period: "2025 - 2028",
    school: "Faculty of Electrical Engineering (ETF) Sarajevo",
    degree: "Data Science and Artificial Intelligence",
  },
  {
    period: "2021 - 2025",
    school: "High School of Electrical Engineering Sarajevo",
    degree: "Computer Science and Informatics",
  },
];

export default function Education() {
  return (
    <section className="ed-root" aria-label="Education">
      <div className="ed-eyebrow">education</div>

      <div className="ed-list">
        {education.map((item) => (
          <article className="ed-card" key={item.school}>
            <div className="ed-period">{item.period}</div>
            <div className="ed-content">
              <h3 className="ed-program">{item.degree}</h3>
              <p className="ed-school">{item.school}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
