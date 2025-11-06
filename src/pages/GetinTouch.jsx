import React, { useState } from "react";
import { motion } from "framer-motion";
import Card, { CardContent } from "../components/ui/Card.jsx";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import "./GetinTouch.css";

function GetinTouch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
      setTimeout(() => setSuccess(false), 2500);
    }, 1200);
  }

  const contactInfo = [
    { icon: Mail, title: "Email", value: "lalitr826@gmail.com", link: "mailto:lalitr826@gmail.com" },
    { icon: Phone, title: "Phone", value: "+91 8569806978", link: "tel:+918569806978" },
    { icon: MapPin, title: "Location", value: "Hisar, Haryana, India", link: "https://maps.app.goo.gl/Wkmwcum7y6uPT2bJ7" },
  ];

  const socialLinks = [
    { icon: Github, name: "GitHub", link: "https://github.com/Rajputlalit" },
    { icon: Linkedin, name: "LinkedIn", link: "https://linkedin.com/in/lalit-rajput-950220216" },
    { icon: Twitter, name: "Twitter", link: "https://twitter.com" },
  ];

  return (
    <section className="contact-section">
      <div className="contact-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="contact-header"
        >
          <h1>
            Get In <span className="grad-text">Touch</span>
          </h1>
          <p>
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Left - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="contact-form"
          >
            <Card className="glass">
              <CardContent>
                <h2>Send Me a Message</h2>
                <form onSubmit={handleSubmit} className="form-grid">
                  <div className="field-half">
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field-half">
                    <label>Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field-full">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field-full">
                    <label>Message</label>
                    <textarea
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="send-btn"
                  >
                    {isSubmitting ? "Sending..." : <><Send size={16} /> Send Message</>}
                  </button>
                  {success && <p className="success-text">✅ Message sent successfully!</p>}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="contact-info"
          >
            {/* Info */}
            <Card className="grad-card text-white">
              <CardContent>
                <h3>Contact Information</h3>
                <div className="info-list">
                  {contactInfo.map((info, i) => {
                    const Icon = info.icon;
                    return (
                      <a
                        key={i}
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="info-item"
                      >
                        <div className="info-icon"><Icon /></div>
                        <div>
                          <p className="small">{info.title}</p>
                          <p>{info.value}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Social */}
            <Card className="glass">
              <CardContent>
                <h3>Follow Me</h3>
                <div className="social-list">
                  {socialLinks.map((social, i) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={i}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-item"
                      >
                        <Icon /> <span>{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Email */}
            <Card className="glass">
              <CardContent className="text-center">
                <div className="quick-icon grad-card">
                  <Mail className="icon" />
                </div>
                <h4>Quick Email</h4>
                <p>Prefer email? Drop me a line directly</p>
                <a
                  href="mailto:lalitr826@gmail.com"
                  className="email-btn"
                >
                  Email Me
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="availability"
        >
          <div className="dot"></div>
          <span>Available for Freelance</span>
          <h3>Currently Available for New Projects</h3>
          <p>
            I'm open to freelance opportunities and would love to hear about your project.
            Let's create something amazing together!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
export default GetinTouch;