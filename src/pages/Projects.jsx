import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";
import "./Projects.css";

function Projects() {
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      title: "E-Commerce Platform",
      category: "React",
      description:
        "A fully responsive e-commerce website with cart functionality, product filtering, and checkout process built with React and CSS.",
      image:
        "https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?auto=format&fit=crop&w=1080&q=80",
      tags: ["React", "CSS", "Context API"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      title: "3D Product Showcase",
      category: "Three.js",
      description:
        "Interactive 3D product viewer with realistic lighting and animations using Three.js and React.",
      image:
        "https://images.unsplash.com/photo-1652212976547-16d7e2841b8c?auto=format&fit=crop&w=1080&q=80",
      tags: ["Three.js", "React", "WebGL"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      title: "Portfolio Website Builder",
      category: "React",
      description:
        "A template-based portfolio builder with live preview and drag-and-drop UI using React and Swiper.js.",
      image:
        "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?auto=format&fit=crop&w=1080&q=80",
      tags: ["React", "Swiper.js", "React Router"],
      demoLink: "#",
      githubLink: "#",
    },
  ];

  const categories = ["All", "React", "Three.js", "JavaScript", "CSS"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section className="projects-section">
      {/* Header */}
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>
          My{" "}
          <span className="gradient-text">
            Projects
          </span>
        </h1>
        <p>
          A showcase of my work demonstrating creativity and technical expertise.
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        className="filter-bar"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="filter-icon">
          <Filter size={16} />
          <span>Filter:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project, i) => (
          <motion.div
            key={i}
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="project-img-wrap">
              <img src={project.image} alt={project.title} />
              <div className="img-overlay">
                <a href={project.demoLink} className="overlay-btn">
                  <ExternalLink size={18} />
                </a>
                <a href={project.githubLink} className="overlay-btn">
                  <Github size={18} />
                </a>
              </div>
            </div>
            <div className="project-info">
              <div className="project-top">
                <h3>{project.title}</h3>
                <span className="tag">{project.category}</span>
              </div>
              <p>{project.description}</p>
              <div className="tags">
                {project.tags.map((t, k) => (
                  <span key={k}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="projects-cta"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Have a Project in Mind?</h2>
        <p>
          I'm always open to new projects, creative ideas, and collaborations.
        </p>
        <a href="/getintouch" className="cta-btn">
          Let's Work Together
        </a>
      </motion.div>
    </section>
  );
}

export default Projects;
