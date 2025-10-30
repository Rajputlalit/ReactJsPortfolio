// src/components/CTASection.jsx
import React, { useEffect, useRef } from "react";
import { FaReact, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiHtml5, SiCss3, SiJavascript, SiNodedotjs } from "react-icons/si";
import "./CTASection.css";

/*
  CTASection (Let’s Build Something Amazing)
  - Floating tech icons that follow the cursor (parallax)
  - Short headline + subtext
  - CTA button that scrolls to #contact
  - Beginner-friendly: uses refs + a single mousemove handler
*/

const TECH = [
  { id: "react", icon: <FaReact />, label: "React" },
  { id: "tailwind", icon: <SiTailwindcss />, label: "Tailwind" },
  { id: "html", icon: <SiHtml5 />, label: "HTML5" },
  { id: "css", icon: <SiCss3 />, label: "CSS3" },
  { id: "js", icon: <SiJavascript />, label: "JavaScript" },
  { id: "node", icon: <SiNodedotjs />, label: "Node.js" },
  { id: "github", icon: <FaGithub />, label: "GitHub" },
];

export default function CTASection() {
  const containerRef = useRef(null);
  const floatsRef = useRef([]);

  // helper to set transforms to each floating item
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Cursor relative to center [-0.5 .. 0.5] horizontally and vertically
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;

      // for each float, compute a transform based on its speed factor
      floatsRef.current.forEach((el, i) => {
        if (!el) return;
        const speed = (i % 4) * 10 + 6; // 6,16,26,36... different speeds
        // small offset so icons don't sit exactly center
        const offsetX = (cx * speed).toFixed(2);
        const offsetY = (cy * speed).toFixed(2);
        el.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      });
    };

    // subtle idle float using requestAnimationFrame
    let raf = null;
    let t = 0;
    const idle = () => {
      t += 0.01;
      floatsRef.current.forEach((el, i) => {
        if (!el) return;
        const bob = Math.sin(t * (0.8 + i * 0.12)) * (4 + (i % 3));
        const current = el.style.transform || "translate3d(0px, 0px, 0)";
        // append small bobbing (we use translateY addition)
        el.style.transform = current + ` translateY(${bob}px)`;
      });
      raf = requestAnimationFrame(idle);
    };

    // attach listener
    container.addEventListener("mousemove", handleMove);
    // start idle
    raf = requestAnimationFrame(idle);

    // cleanup
    return () => {
      container.removeEventListener("mousemove", handleMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // scroll-to-contact action
  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="cta-section" ref={containerRef}>
      <div className="cta-inner">
        <div className="cta-left">
          <h2 className="cta-title">Let’s build something amazing — together.</h2>
          <p className="cta-sub">
            I turn design ideas into interactive web experiences using modern HTML, CSS, JavaScript, and React.
            If you have a project or just want to experiment — let’s talk.
          </p>

          <div className="cta-actions">
            <button className="cta-primary" onClick={handleScrollToContact}>
              Start a Conversation
            </button>
            <a
              className="cta-secondary"
              href="https://github.com/Rajputlalit"
              target="_blank"
              rel="noreferrer"
            >
              View Code on GitHub
            </a>
          </div>

          <div className="cta-techline">
            <span>Built with:</span>
            <ul>
              <li>React</li>
              <li>Vite</li>
              <li>CSS / Tailwind-ready</li>
            </ul>
          </div>
        </div>

        <div className="cta-right" aria-hidden>
          {/* Floating tech icons */}
          <div className="float-area">
            {TECH.map((t, i) => (
              <button
                key={t.id}
                className={`float-item float-${i}`}
                ref={(el) => (floatsRef.current[i] = el)}
                title={t.label}
                onClick={() => window.alert(`${t.label} — used in this project`)}
                aria-label={t.label}
              >
                <div className="float-icon">{t.icon}</div>
                <span className="float-label">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
