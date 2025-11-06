import React from "react";
import { motion } from "framer-motion";
import { Code2, Palette, Zap, Database } from "lucide-react";
import "./Skills.css";

function Skills() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const skillCategories = [
    {
      category: "Frontend Technologies",
      icon: Code2,
      color: "violet-gradient",
      skills: [
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "JavaScript (ES6+)", level: 88 },
        { name: "React.js 19", level: 92 },
        { name: "Tailwind CSS 4", level: 90 },
      ],
    },
    {
      category: "Libraries & Frameworks",
      icon: Zap,
      color: "violet-gradient",
      skills: [
        { name: "Three.js", level: 75 },
        { name: "Swiper.js", level: 85 },
        { name: "React Router", level: 90 },
        { name: "React Hooks", level: 92 },
        { name: "Framer Motion", level: 80 },
      ],
    },
    {
      category: "Design & UI/UX",
      icon: Palette,
      color: "violet-gradient",
      skills: [
        { name: "Responsive Design", level: 95 },
        { name: "Flexbox & Grid", level: 93 },
        { name: "UI/UX Principles", level: 85 },
        { name: "Animation", level: 82 },
        { name: "Accessibility", level: 80 },
      ],
    },
    {
      category: "State Management",
      icon: Database,
      color: "violet-gradient",
      skills: [
        { name: "Props & State", level: 95 },
        { name: "Context API", level: 88 },
        { name: "React Hooks (useState, useEffect)", level: 92 },
        { name: "Component Composition", level: 90 },
        { name: "Virtual DOM", level: 85 },
      ],
    },
  ];

  const tools = [
    "VS Code",
    "Git & GitHub",
    "npm / yarn",
    "Chrome DevTools",
    "Figma",
    "Webpack",
    "Babel",
    "ESLint",
  ];

  return (
    <section className="skills-section">
      <div className="skills-container">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="skills-header"
        >
          <h1>
            My <span className="gradient-text">Skills</span>
          </h1>
          <p>
            A comprehensive overview of my technical skills and expertise in
            modern web development
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {skillCategories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="skill-card glass-card"
              >
                <div className="card-header">
                  <div className="icon-box violet-gradient-bg">
                    <Icon className="icon" />
                  </div>
                  <h3>{category.category}</h3>
                </div>

                <div className="skills-list">
                  {category.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                    >
                      <div className="skill-info">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            delay: idx * 0.1 + 0.3,
                            duration: 0.8,
                          }}
                          className="progress-fill violet-gradient-bg"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tools */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="tools-section"
        >
          <h2>
            Tools & <span className="gradient-text">Technologies</span>
          </h2>
          <div className="tools-list">
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3 }}
                className="tool-tag glass-card"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Bento */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="tech-stack"
        >
          <h2>
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <div className="bento-grid">
            {[
              "React.js",
              "Tailwind",
              "JavaScript",
              "HTML5",
              "CSS3",
              "Three.js",
              "Swiper.js",
              "React Router",
              "React Hooks",
              "Props & State",
            ].map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bento-card glass-card"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Panel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="skills-footer violet-gradient-bg"
        >
          <h3>Continuous Learning</h3>
          <p>
            I'm constantly expanding my skill set and staying up-to-date with
            the latest trends and technologies in frontend development. Every
            project is an opportunity to learn and grow.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
