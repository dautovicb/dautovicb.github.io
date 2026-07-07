import "./TechStack.css";

const groups = [
  {
    label: "machine learning & ai",
    speed: "34s",
    items: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "NumPy", "OpenCV", "RF-DETR", "BERTić", "YOLO"],
  },
  {
    label: "full-stack development",
    speed: "38s",
    items: [".NET", "EF Core", "SQL", "Postgres", "Keycloak", "React", "Next.js", "TypeScript", "Angular", "React Native", "Node.js", "Git", "Docker", "C++", "TailwindCSS", "HTML", "CSS", "JavaScript", "Vue", "FastAPI"],
  },
  {
    label: "game development",
    speed: "32s",
    items: ["C#", "Unity", "ML-Agents", "Blender", "Photoshop", "Audacity"],
  },
];

function TickerRow({ label, items, speed }) {
  return (
    <div className="ts-row">
      <div className="ts-label">{label}</div>
      <div className="ts-marquee" aria-label={label}>
        <div className="ts-track" style={{ "--ts-duration": speed }}>
          {[0, 1].map((copy) => (
            <div className="ts-segment" key={copy} aria-hidden={copy === 1}>
              {items.map((item, index) => (
                <span className="ts-chip-wrap" key={`${copy}-${item}-${index}`}>
                  {<span className="ts-sep" aria-hidden="true">•</span>}
                  <span className="ts-chip">{item}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="ts-root" aria-label="Tech stack">
      <h2 className="ts-heading">
        If you really care about the stack, this is what I&apos;ve used to get the job done.
      </h2>

      <div className="ts-list">
        {groups.map((group) => (
          <TickerRow
            key={group.label}
            label={group.label}
            items={group.items}
            speed={group.speed}
          />
        ))}
      </div>
    </section>
  );
}