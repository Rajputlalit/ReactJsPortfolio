// src/components/GalaxySection.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./GalaxySection.css";

export default function GalaxySection() {
  const mountRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  let idleTimeout;

  useEffect(() => {
    const mount = mountRef.current;
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

    // --- Create particles (floating tech dots) ---
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 40;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({
      size: 0.2,
      color: "#6E06F2",
    });
    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    camera.position.z = 15;

    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    let clock = new THREE.Clock();
    let isIdle = false;

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      particlesMesh.rotation.y = 0.1 * elapsedTime;
      if (!isIdle) {
        targetX += 0.001 * (mouseX - targetX);
        targetY += 0.001 * (mouseY - targetY);
        particlesMesh.rotation.y += 0.002 * (targetX);
        particlesMesh.rotation.x += 0.002 * (targetY);
      }
      renderer.render(scene, camera);
    };
    animate();

    // --- Mouse interaction ---
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      isIdle = false;
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => (isIdle = true), 4000);
    };
    window.addEventListener("mousemove", handleMouseMove);

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

  // ---- popup contact form ----
  const handleFormClick = (e) => e.stopPropagation();
  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  return (
    <section className="galaxy-section">
      <div className="galaxy-canvas" ref={mountRef}></div>

      <div className="galaxy-content">
        <h2>Let’s Build Something Cosmic ✨</h2>
        <p>
          Exploring the universe of web development — from clean HTML & CSS
          constellations to React.js galaxies and beyond.
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open("https://wa.me/91XXXXXXXXXX", "_blank");
              }}
            >
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Write your message..." required></textarea>
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
