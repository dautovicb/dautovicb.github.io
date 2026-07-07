import { useEffect, useRef } from "react";
import "./About.css";

const range = [
  {
    domain: "game dev",
    tools: ["Unity", "C#", "ML-Agents", "Blender"],
    proof: "4 games shipped — one reached 10k players with no marketing",
  },
  {
    domain: "web",
    tools: ["React", ".NET", "Angular", "FastAPI"],
    proof: "desqly, nebulora, ulov.ba — built end to end",
  },
  {
    domain: "computer vision",
    tools: ["PyTorch", "RF-DETR", "ConvNeXtV2"],
    proof: "phone-damage detection at 0.947 mAP",
  },
  {
    domain: "nlp",
    tools: ["BERTić", "custom NER"],
    proof: "free-text Bosnian listing parser for ulov.ba",
  },
  {
    domain: "reinforcement learning",
    tools: ["Unity ML-Agents"],
    proof: "an agent that drives a manual gearbox — clutch and all",
  },
  {
    domain: "mobile",
    tools: ["React Native (tvOS)"],
    proof: "offline prayer-times display for mosque TVs",
  },
];

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll("[data-reveal]") ?? [];
    const observer = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ab-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ab-root" aria-label="About" ref={rootRef}>
      <div className="ab-eyebrow">about</div>

      <div className="ab-manifesto" data-reveal>
        <p className="ab-lead">
          I don&apos;t care about technologies. I ship whatever the problem needs.
        </p>
        <p className="ab-body">
          I shipped my first project at fourteen and it reached thousands of users. Since then I&apos;ve worked on many projects, some for clients, some for myself. The throughline is that I get dropped into an unfamiliar
          domain and come out the other side with something running in
          production.
        </p>
      </div>
    </section>
  );
}
