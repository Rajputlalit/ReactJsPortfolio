import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  GraduationCap,
  Award,
  Users,
  BookOpen,
  Code,
  TrendingUp,
} from "lucide-react";
import "./Experience.css";

export function Experience() {
  // framer controls + in-view for top-level section
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  // --- Animated counters ---
  const countersRef = useRef({
    students: 0,
    projects: 0,
    years: 0,
  });
  const [students, setStudents] = useState(0);
  const [projects, setProjects] = useState(0);
  const [years, setYears] = useState(0);
  const countedOnceRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countedOnceRef.current) {
            countedOnceRef.current = true;
            // start count animations
            animateValue(0, 100, 1400, setStudents); // Students -> 100
            animateValue(0, 6, 1100, setProjects);   // Projects -> 6
            animateValue(0, 2, 900, setYears);       // Years -> 2
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  function animateValue(start, end, duration, setter) {
    const startTime = performance.now();
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + (end - start) * easeOutCubic(progress));
      setter(value);
      if (progress < 1) requestAnimationFrame(step);
      else setter(end);
    }
    requestAnimationFrame(step);
  }
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  const experiences = [
    {
      role: "Coding Instructor",
      organization: "CBSE Affiliated Schools",
      duration: "2 Years",
      type: "Teaching",
      description:
        "Teaching programming fundamentals and web development to students, creating engaging curriculum, and fostering problem-solving skills.",
      achievements: [
        "Taught 100+ students programming fundamentals",
        "Developed interactive coding lessons and projects",
        "Improved student engagement by 85% through hands-on activities",
        "Mentored students in building their first web applications",
      ],
      icon: GraduationCap,
      color: "grad-blue",
    },
  ];

  const certifications = [
    {
      title: "Frontend Development",
      issuer: "HARTRON Skill Center, Haryana",
      date: "Certified Professional",
      description:
        "Comprehensive certification covering HTML5, CSS3, JavaScript, React.js, and modern frontend development practices.",
      icon: Award,
      color: "grad-purple",
    },
  ];

  const skills = [
    {
      title: "Technical Teaching",
      description: "Breaking down complex programming concepts into understandable lessons",
      icon: BookOpen,
    },
    {
      title: "Curriculum Development",
      description: "Creating engaging and effective coding curriculum for students",
      icon: Code,
    },
    {
      title: "Student Mentorship",
      description: "Guiding students through their learning journey and project development",
      icon: Users,
    },
    {
      title: "Continuous Improvement",
      description: "Always updating teaching methods with latest industry practices",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="exp-section" ref={ref}>
      <div className="exp-inner">
        <motion.div
          className="exp-header"
          initial={{ opacity: 0, y: -18 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6 }}
        >
          <h1>
            My{" "}
            <span className="grad-text">
              Experience
            </span>
          </h1>
          <p className="exp-sub">
            Professional journey, certifications, and achievements in web development and education
          </p>
        </motion.div>

        {/* Professional Experience */}
        <motion.div
          className="exp-block"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <h2 className="exp-title">
            Professional <span className="grad-text">Experience</span>
          </h2>

          <div className="exp-list">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={index}
                  className="exp-item"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                >
                  <Card className="exp-card glass">
                    <CardContent className="exp-card-inner">
                      <div className="exp-row">
                        <div className="exp-badge-col">
                          <div className={`icon-bubble ${exp.color}`}>
                            <Icon className="icon" />
                          </div>
                          <div className="duration-pill">{exp.duration}</div>
                        </div>

                        <div className="exp-content">
                          <div className="exp-head">
                            <div>
                              <h3 className="exp-role">{exp.role}</h3>
                              <p className="exp-org">{exp.organization}</p>
                            </div>
                            <span className="exp-type">Teaching</span>
                          </div>

                          <p className="exp-desc">{exp.description}</p>

                          <div className="exp-achievements">
                            <h4>Key Achievements:</h4>
                            <ul>
                              {exp.achievements.map((a, i) => (
                                <li key={i} className="exp-li">
                                  <span className="tick">✓</span>
                                  <span>{a}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="certs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="exp-title">
            Certifications & <span className="grad-text">Credentials</span>
          </h2>

          <div className="cert-list">
            {certifications.map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.06 }}
                >
                  <Card className="cert-card grad-card">
                    <CardContent>
                      <div className="cert-row">
                        <div className="cert-icon">
                          <Icon className="icon" />
                        </div>
                        <div className="cert-body">
                          <h3>{cert.title}</h3>
                          <p className="muted">{cert.issuer}</p>
                          <p className="muted small">{cert.date}</p>
                          <p className="muted desc">{cert.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Teaching Skills Bento */}
        <motion.div
          className="skills-bento"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="exp-title center">
            Teaching & <span className="grad-text">Mentorship Skills</span>
          </h2>

          <div className="bento-grid">
            {skills.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  className="bento-card glass small"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Card className="h-full glass no-border">
                    <CardContent>
                      <div className="bento-row">
                        <div className="bento-icon grad-small">
                          <Icon className="icon" />
                        </div>
                        <div>
                          <h4 className="bento-title">{s.title}</h4>
                          <p className="muted small">{s.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Impact / Counters */}
        <motion.div
          className="impact"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="impact-inner grad-strong">
            <div className="impact-head">
              <h2>Making an Impact</h2>
              <p className="muted">Through teaching and development, I strive to create positive change in the tech community</p>
            </div>

            <div className="counters">
              <div className="counter">
                <div className="count">{students >= 100 ? "100+" : students}</div>
                <div className="label">Students Taught</div>
              </div>
              <div className="counter">
                <div className="count">{projects >= 6 ? "6+" : projects}</div>
                <div className="label">Projects Completed</div>
              </div>
              <div className="counter">
                <div className="count">{years >= 2 ? "2+" : years}</div>
                <div className="label">Years Experience</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;
