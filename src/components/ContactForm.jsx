// src/components/ContactForm.jsx
import React, { useState } from "react";
import "./ContactForm.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");

    // Simulate sending (replace with real API call later)
    try {
      await new Promise((res) => setTimeout(res, 800)); // fake delay
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-wrap">
        <div className="contact-head">
          <h2>Start a Conversation</h2>
          <p>Got an idea, collaboration, or just want to say hi? Let’s connect — I reply quickly.</p>
        </div>

        {status === "success" ? (
          <div className="thankyou-message" role="status">
            <h3>Thank you! 😊</h3>
            <p>I received your message and will get back to you soon.</p>
            <button className="clear-btn" onClick={() => setStatus("idle")}>Send another</button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="input-row">
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-row">
              <textarea
                name="message"
                rows="5"
                placeholder="Write a short message..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="send-btn" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
              {status === "error" && (
                <div className="form-error">Please fill all fields correctly.</div>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
