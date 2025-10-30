import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaReact, FaGithub, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiHtml5, SiCss3, SiJavascript, SiVite, SiFigma, SiCanva, SiNodedotjs, SiVisualstudiocode } from "react-icons/si";
import ContactModal from "./ContactModal.jsx";
// import "./ModalContact.css";
// import ModalContact from "./ModalContact.jsx";
import "./GalaxyCTA.css";

/**
 * GalaxyCTA
 * - Full-width, full-height section
 * - Parallax "galaxy" with many floating tech icons (stars) across the entire background
 * - Icons react to cursor (parallax) and gently bob when idle
 * - Big readable content panel overlays the background
 * - CTA opens a modal contact form (popup)
 */

const ICON_POOL = [
  { id: "react", icon: <FaReact /> },
  { id: "tailwind", icon: <SiTailwindcss /> },
  { id: "html", icon: <SiHtml5 /> },
  { id: "css", icon: <SiCss3 /> },
  { id: "js", icon: <SiJavascript /> },
  { id: "vite", icon: <SiVite /> },
  { id: "github", icon: <FaGithub /> },
  { id: "node", icon: <FaNodeJs /> },
  { id: "nodedot", icon: <SiNodedotjs /> },
  { id: "figma", icon: <SiFigma /> },
  { id: "canva", icon: <SiCanva /> },
  { id: "vscode", icon: <SiVisualstudiocode /> },
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function GalaxyCTA() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const layerRef = useRef(null);
  const particlesRef = useRef([]);
  const idleRAF = useRef(null);
  const lastMoveAt = useRef(0);

  // Create 36 floating particles from the icon pool (repeat, randomize)
  const PARTICLES = useMemo(() => {
    const arr = [];
    const count = 36; // you can increase to 48 or 60—kept reasonable for perf
    for (let i = 0; i < count; i++) {
      const pick = ICON_POOL[i % ICON_POOL.length];
      arr.push({
        ...pick,
        key: `${pick.id}-${i}`,
        // initial normalized positions (0..1); actual px set by CSS percentages
        x: Math.random(),
        y: Math.random(),
        size: randomBetween(0.9, 1.25), // size multiplier
        depth: randomBetween(0.2, 1.0), // parallax depth (lower = farther)
        idlePhase: randomBetween(0, Math.PI * 2),
        idleAmp: randomBetween(4, 10),
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    const container = wrapRef.current;
    const layer = layerRef.current;
    if (!container || !layer) return;

    const onMove = (e) => {
      lastMoveAt.current = performance.now();

      const rect = container.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5..0.5
      const cy = (e.clientY - rect.top) / rect.height - 0.5;

      // Move the whole starfield layer slightly (background parallax)
      const bgX = cx * 20; // tweak for stronger/weaker background pan
      const bgY = cy * 20;
      layer.style.transform = `translate3d(${bgX}px, ${bgY}px, 0)`;

      // Move each particle relative to its depth (nearer = more movement)
      particlesRef.current.forEach((el, i) => {
        if (!el) return;
        const p = PARTICLES[i];
        const strength = 26 * p.depth; // scale effect by depth
        const tx = cx * strength;
        const ty = cy * strength;
        el.style.setProperty("--tx", `${tx}px`);
        el.style.setProperty("--ty", `${ty}px`);
      });
    };

    // Idle animation (gentle bob when cursor idle)
    const loop = () => {
      const now = performance.now();
      const isIdle = now - lastMoveAt.current > 1200; // 1.2s no move = idle
      if (isIdle) {
        particlesRef.current.forEach((el, i) => {
          if (!el) return;
          const p = PARTICLES[i];
          const t = now / 1000 + p.idlePhase;
          const bob = Math.sin(t * (0.6 + p.depth)) * p.idleAmp;
          el.style.setProperty("--idleY", `${bob}px`);
        });
      } else {
        // fade idle effect when user is moving
        particlesRef.current.forEach((el) => el && el.style.setProperty("--idleY", `0px`));
      }
      idleRAF.current = requestAnimationFrame(loop);
    };

    container.addEventListener("mousemove", onMove);
    lastMoveAt.current = performance.now() + 2000; // start idle for first 2s
    idleRAF.current = requestAnimationFrame(loop);

    return () => {
      container.removeEventListener("mousemove", onMove);
      if (idleRAF.current) cancelAnimationFrame(idleRAF.current);
    };
  }, [PARTICLES]);

  return (
    <section className="galaxy-section" ref={wrapRef}>
      {/* Sticky 3D galaxy background that fills the entire section */}
      <div className="galaxy-bg" ref={layerRef} aria-hidden>
        {PARTICLES.map((p, i) => (
          <div
            key={p.key}
            ref={(el) => (particlesRef.current[i] = el)}
            className="particle"
            style={{
              left: `${p.x * 100}%`,
              top: `${p.y * 100}%`,
              "--depth": p.depth,
              "--size": p.size,
            }}
            title={p.id}
          >
            <span className="particle-icon">{p.icon}</span>
          </div>
        ))}

        {/* faint star dots for richness (pure CSS via :before repeating-radial-gradients) */}
        <div className="starfield" />
      </div>

      {/* Foreground content panel (opaque for readability) */}
      <div className="galaxy-content">
        <h2 className="galaxy-title">
          Let’s build something <span>amazing</span> — together.
        </h2>
        <p className="galaxy-sub">
          I craft interactive web experiences with HTML, CSS, JavaScript, and React.  
          This section is rendered with a live 3D parallax—icons float like a galaxy and react to your cursor.
        </p>

        <div className="galaxy-actions">
          <button className="galaxy-primary" onClick={() => setOpen(true)}>
            Start a Conversation
          </button>
          <a
            className="galaxy-secondary"
            href="https://github.com/Rajputlalit"
            target="_blank"
            rel="noreferrer"
          >
            View Code on GitHub
          </a>
        </div>

        <ul className="galaxy-tech">
          <li>React</li>
          <li>Vite</li>
          <li>JavaScript</li>
          <li>CSS / Tailwind-ready</li>
          <li>VS Code</li>
        </ul>
      </div>

      {/* Contact modal */}
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
