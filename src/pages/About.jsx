import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaBullseye, FaGraduationCap, FaAward } from "react-icons/fa";
import "./About.css";

function About() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const values = [
    {
      icon: <FaHeart />,
      title: "Passion for Coding",
      description:
        "I love creating elegant solutions to complex problems and bringing ideas to life through code.",
    },
    {
      icon: <FaBullseye />,
      title: "Detail-Oriented",
      description:
        "Meticulous attention to detail ensures pixel-perfect designs and clean, maintainable code.",
    },
    {
      icon: <FaGraduationCap />,
      title: "Continuous Learning",
      description:
        "Always staying updated with the latest web technologies and best practices in development.",
    },
    {
      icon: <FaAward />,
      title: "Quality Focused",
      description:
        "Committed to delivering high-quality work that exceeds expectations and industry standards.",
    },
  ];

  return (
    <section className="about-section">
      <div className="about-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="about-header"
        >
          <h1>
            About{" "}
            <span className="gradient-text">
              Me
            </span>
          </h1>
          <p>
            Learn more about my journey, skills, and what drives me as a frontend developer
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Column */}
          <motion.div className="about-card glass-card" variants={itemVariants}>
            <h2>My Story</h2>
            <div className="story-text">
              <p>
                Hello! I'm <strong>Lalit Rajput</strong>, a passionate Frontend Web Developer with a strong
                foundation in modern web technologies. My journey began with a fascination for creating
                interactive and visually appealing digital experiences.
              </p>
              <p>
                Over the past 2 years, I’ve had the privilege of teaching coding to students at CBSE-affiliated
                schools, helping shape the next generation of developers.
              </p>
              <p>
                I’m certified from <strong>HARTRON Skill Center</strong>, Haryana, in Frontend Development.
                My focus is on clean, maintainable code and great user experiences.
              </p>
              <p>
                When I’m not coding, I’m exploring new technologies, contributing to open-source projects, or
                sharing knowledge with the community.
              </p>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div className="about-right" variants={itemVariants}>
            <div className="gradient-card">
              <div className="card-header">
                <FaGraduationCap size={28} />
                <h3>Education</h3>
              </div>
              <div className="edu-content">
                <h4>Frontend Development</h4>
                <p>HARTRON Skill Center, Haryana</p>
                <p className="small">Certified Professional</p>
              </div>
            </div>

            <div className="glass-card">
              <div className="card-header">
                <FaAward size={28} className="violet" />
                <h3>Professional Experience</h3>
              </div>
              <div className="exp-content">
                <h4>Coding Instructor</h4>
                <p>CBSE Affiliated Schools</p>
                <p className="small">2 Years</p>
                <p className="desc">
                  Teaching programming fundamentals and web development, fostering creativity and problem-solving skills.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="values-section"
        >
          <h2>
            My <span className="gradient-text">Values</span>
          </h2>
          <div className="values-grid">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="value-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -10 }}
              >
                <div className="icon-wrap">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="funfacts-section"
        >
          <h2>Fun Facts About Me</h2>
          <div className="funfacts-grid">
            <div>
              <div className="emoji">☕</div>
              <p>Coffee is my debugging tool</p>
            </div>
            <div>
              <div className="emoji">🎨</div>
              <p>Love creating pixel-perfect designs</p>
            </div>
            <div>
              <div className="emoji">🚀</div>
              <p>Always learning new technologies</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
