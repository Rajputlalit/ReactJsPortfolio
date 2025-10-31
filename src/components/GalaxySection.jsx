// src/components/GalaxySection.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./GalaxySection.css";

export default function GalaxySection() {
  const mountRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  let idleTimeout;

  useEffect(() => {
    const mount = mountRef.current;

    // === SCENE SETUP ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    camera.position.z = 18;

    // === FLOATING ICON SPRITES ===
    function makeTextureFromChar(char, px = 128, color = "#c9b6ff", font = "bold 110px Poppins") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      canvas.width = px * dpr;
      canvas.height = px * dpr;
      ctx.scale(dpr, dpr);

      // Circle base for better visibility
  // remove backing circle for clean transparent icons
ctx.clearRect(0, 0, px, px);


      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = font;
      ctx.fillText(char, px / 2, px / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
      texture.generateMipmaps = true;

      return texture;
    }

    const GLYPHS = [
      "⚛️", "💻", "🎨", "🧠", "🚀", "📦", "🧩", "💡", "🌐", "🔧",
      "📱", "🎯", "🪄", "🛰️", "🔗", "✨", "📊", "🔁", "💬", "🧭"
    ];
    const COLORS = ["#ffffff", "#d8b4ff", "#a78bfa", "#c084fc", "#93c5fd"];
    const texturePool = [];

    // Create small textures to reduce icon size
    for (let g = 0; g < GLYPHS.length; g++) {
      for (let c = 0; c < COLORS.length; c++) {
        const size = 100 + Math.random() * 50;
        texturePool.push(makeTextureFromChar(GLYPHS[g], size, COLORS[c]));
      }
    }

    // Generate icon sprites
    const iconsCount = 800; // fewer = faster render, denser = more full background
    const icons = [];
    for (let i = 0; i < iconsCount; i++) {
      const texture = texturePool[Math.floor(Math.random() * texturePool.length)];
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(material);

      sprite.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 50
      );
      const s = 0.3 + Math.random() * 0.5; // Smaller icons
      sprite.scale.set(s, s, 1);

      sprite.userData = {
        baseY: sprite.position.y,
        floatSpeed: 0.9 + Math.random() * 1,
        rotSpeed: 0.002 + Math.random() * 0.005,
      };

      scene.add(sprite);
      icons.push(sprite);
    }

    // === ANIMATION & INTERACTION ===
    let mouseX = 0, mouseY = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Floating effect for each icon
      icons.forEach((sp, i) => {
        sp.position.y = sp.userData.baseY + Math.sin(t * sp.userData.floatSpeed + i) * 0.3;
        sp.material.rotation += sp.userData.rotSpeed;
      });

      // Subtle scene parallax
      scene.rotation.y = mouseX * 1;
      scene.rotation.x = mouseY * 1;

      renderer.render(scene, camera);
    };
    animate();

    // === Mouse interaction for cursor-parallax ===
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.9);
      mouseY = (e.clientY / window.innerHeight - 0.5);
      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        mouseX = 0;
        mouseY = 0;
      }, 4000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // === Resize handling ===
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  // === CONTACT FORM POPUP ===
const handleFormClick = (e) => e.stopPropagation();
  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const encodedMessage = encodeURIComponent(
      `Hello Lalit, I’m ${name} (${email}).\n\n${message}`
    );
    window.open(`https://wa.me/918569806978?text=${encodedMessage}`, "_blank");
    setShowForm(false);
    setFormData({ name: "", email: "", message: "" });
    alert("✅ Thanks for reaching out! Redirecting you to WhatsApp...");
  };


  return (
      <section className="galaxy-section">
      <div className="galaxy-canvas" ref={mountRef}></div>

      <div className="galaxy-content">
        <h2>Let’s Create Something That Matters</h2>
        <p>
          Have an idea that can make a real-world impact? Let’s bring it to life with design, logic, and AI-powered development.
          Together, we can turn innovation into reality.
        </p>
        <div className="galaxy-actions">
          <button className="cta-btn" onClick={openForm}>
            Start a Conversation
          </button>
          <button
            className="cta-outline"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/lalit-rajput-950220216/details/services/",
                "_blank"
              )
            }
          >
            View Services on LinkedIn
          </button>
        </div>
      </div>

      {showForm && (
        <div className="popup-overlay" onClick={closeForm}>
          <div className="popup" onClick={handleFormClick}>
            <h3>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="send-btn">
                Send via WhatsApp
              </button>
            </form>
            <button className="close-x" onClick={closeForm}>
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
