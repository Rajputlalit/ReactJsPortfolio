import React, { useEffect, useRef, useState } from "react";
import "./ContactModal.css";

/**
 * ContactModal
 * - Accessible dialog with overlay
 * - Simple validation
 * - Quick actions: WhatsApp, Email, LinkedIn Services
 * - Replace PHONE_NUMBER / EMAIL / LINKEDIN_URL with your real info
 */

export default function ContactModal({ open, onClose }) {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, [open]);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const onChange = (e) => {
    setError("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      setError("Please fill all fields correctly.");
      return;
    }
    // Here you could call an API / Netlify Forms / Email service
    alert("Thanks! I’ll get back to you soon.");
    onClose?.();
  };

  const WHATSAPP_NUMBER = "YOUR_PHONE_WITH_COUNTRY_CODE"; // e.g. "919999999999"
  const LINKEDIN_SERVICES_URL = "https://www.linkedin.com/in/YOUR-USERNAME/details/services/";
  const EMAIL = "your@email.com";

  const waText = encodeURIComponent(
    `Hi Lalit! I'm ${data.name || ""} — ${data.message || "I'd like to discuss a project."}`
  );
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent("Project inquiry from portfolio")}&body=${encodeURIComponent(
    `${data.message}\n\n— ${data.name} (${data.email})`
  )}`;

  return (
    <div className="cm-backdrop" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="cm-dialog" role="dialog" aria-modal="true" ref={dialogRef}>
        <button className="cm-close" onClick={onClose} aria-label="Close">×</button>
        <h3>Start a Conversation</h3>
        <p className="cm-sub">Tell me a bit about your idea and how I can help.</p>

        <form className="cm-form" onSubmit={onSubmit} noValidate>
          <div className="cm-row">
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={data.name}
              onChange={onChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              value={data.email}
              onChange={onChange}
              required
            />
          </div>
          <textarea
            name="message"
            rows="5"
            placeholder="Write your message..."
            value={data.message}
            onChange={onChange}
            required
          />

          {error && <div className="cm-error">{error}</div>}

          <div className="cm-actions">
            <button type="submit" className="cm-primary">Send</button>
            <a className="cm-ghost" href={waHref} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="cm-ghost" href={mailHref}>Email</a>
            <a className="cm-ghost" href={LINKEDIN_SERVICES_URL} target="_blank" rel="noreferrer">LinkedIn Services</a>
          </div>
        </form>
      </div>
    </div>
  );
}
