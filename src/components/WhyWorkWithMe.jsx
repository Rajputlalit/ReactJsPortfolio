// src/components/WhyWorkWithMe.jsx
import React from "react";
import { FaCode, FaLaptopCode, FaReact } from "react-icons/fa";
import { SiJavascript, SiNodedotjs, SiCss3 } from "react-icons/si";
import "./WhyWorkWithMe.css";

function WhyWorkWithMe() {
  return (
    <section className="whywork-section">
      {/* Section Heading */}
      <div className="whywork-header">
        <h2>Why Work With Me</h2>
        <p>
          Because creating something on the web is not just about typing code — it's about learning,
          evolving, and bringing ideas to life through design, logic, and experience.
        </p>
      </div>

      {/* Cards */}
      <div className="whywork-cards">
        <div className="why-card">
          <FaCode className="why-icon" />
          <h3>Clean Code, Real Logic</h3>
          <p>
            I focus on writing clean, readable, and scalable code using HTML, CSS, and JavaScript.
            My JavaScript fundamentals are strong — I work confidently with DOM methods,
            functions, and event-driven interactivity. From building responsive layouts
            to creating interactive sliders and animations, every line is written with purpose.
          </p>
        </div>

        <div className="why-card">
          <FaReact className="why-icon" />
          <h3>ReactJS & Frontend Mastery</h3>
          <p>
            This entire portfolio is built from scratch using ReactJS — a framework I’ve
            self-learned through real implementation. I use props, states, and hooks like
            <strong> useState</strong> and <strong>useEffect</strong> to make my components dynamic and reusable.
            I’ve imported and organized assets, icons, and DOM modules systematically for a clean workflow.
          </p>
        </div>

        <div className="why-card">
          <FaLaptopCode className="why-icon" />
          <h3>Continuous Learner</h3>
          <p>
            My journey doesn’t stop at frontend. I’m currently exploring backend technologies like
            <strong> Node.js</strong> to expand this React portfolio into a fully interactive, data-driven website.
            My aim is to create live websites that not only look good but perform efficiently across the stack.
          </p>
        </div>
      </div>

      {/* Journey Story */}
      <div className="why-journey">
        <h4>My Journey So Far</h4>
        <p>
          From learning HTML and CSS two years ago to self-mastering JavaScript and ReactJS today —
          I’ve built everything through practice, mistakes, and curiosity. I believe in understanding
          the “why” behind every concept — whether it’s how props flow in React or how a function manipulates
          the DOM. This mindset helps me write structured, optimized, and user-centered web applications.
        </p>

        <p>
          Every new skill I learn adds another layer to this journey — and this portfolio itself is the
          reflection of that continuous growth.
        </p>
      </div>

      {/* Personal Quote */}
      <div className="why-footer">
        <p>
          “I build with curiosity, learn with consistency, and code with purpose.”
        </p>
      </div>
    </section>
  );
}

export default WhyWorkWithMe;
