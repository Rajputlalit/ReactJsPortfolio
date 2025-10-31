// src/components/WhyWorkWithMe.jsx
import React from "react";
import { FaCode, FaLaptopCode, FaReact } from "react-icons/fa";
import { SiJavascript, SiNodedotjs, SiCss3, SiOpenai, SiGithubcopilot } from "react-icons/si";
import "./WhyWorkWithMe.css";

function WhyWorkWithMe() {
  return (
    <section className="whywork-section">
      {/* Section Heading */}
      <div className="whywork-header">
        <h2>
          Why Work With Me<span>?</span>
        </h2>
        <p>
          Because building for the web today goes beyond writing code — it’s about blending creativity with intelligence.
          I leverage AI-powered tools like ChatGPT and GitHub Copilot to reason through complex logic, debug efficiently,
          and accelerate development to create
          scalable, future-ready digital experiences.
        </p>
      </div>

      {/* Cards */}
      <div className="whywork-cards">
        <div className="why-card">
          <div class="why-icon-group">
                 <FaCode className="why-icon" />
          <SiJavascript className="why-icon"/>
          </div>
          <h3>Clean Code, Real Logic</h3>
          <p>
            I focus on writing clean, readable, and scalable code using <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>.
            My JavaScript fundamentals are strong — I work confidently with <strong>DOM methods</strong>,
            functions, and event-driven interactivity. From building <strong>responsive layouts</strong>  to creating <strong>interactive sliders</strong> and animations, every line is written with purpose.
          </p>
        </div>

        <div className="why-card">
        <div class="why-icon-group">
            <FaReact className="why-icon" />
          <SiNodedotjs className="why-icon"/>
        </div>
          <h3>ReactJS & Frontend Mastery</h3>
          <p>
            This entire portfolio is built from scratch using <strong>ReactJS — a framework</strong> I’ve
            self-learned through real implementation. I use <strong>props, states,</strong> and <strong>hooks</strong> like
            <strong> useState</strong> and <strong>useEffect</strong> to make my components dynamic and reusable.
            I’ve imported and organized assets, icons, and DOM modules systematically for a clean workflow.
          </p>
        </div>

        {/* Updated AI & Developer Synergy Card */}
        <div className="why-card">
          <div className="why-icon-group">
            <SiOpenai className="why-icon text-teal-400" />
            <SiGithubcopilot className="why-icon text-green-400" />
          </div>
          <h3>AI-Powered Development</h3>
          <p>
            I integrate AI tools like <strong>ChatGPT</strong> and <strong>GitHub Copilot</strong> into my workflow to think, debug, and build smarter.
            From refining code logic to generating creative solutions, AI enhances my speed, accuracy, and innovation —
            transforming challenges into efficient, production-ready outcomes.
          </p>
        </div>
        <div className="why-footer">
          <p>“I build with curiosity, learn with consistency, and code with purpose.”</p>
        </div>
      </div>
    </section>
  );
}

export default WhyWorkWithMe;
