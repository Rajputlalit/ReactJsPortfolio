import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { Linkedin, Github, Mail } from "lucide-react";
import "./Lalitcodes.css";
import myphoto from "../assets/png/png/Lalit.png";
import resumePDF from "../assets/pdf/Lalit_Rajput_Resume.pdf"; // ⚠️ Update path if needed

function Lalitcodes() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const navigate = useNavigate();

  const phrases = [
    "<span>Front</span>end<br>Developer",
    "Web<span class='violet'><br>Designer</span>",
    "<span class='violet' style='color:#6E06F2'>Reactjs</span> Developer",
    "Let's<br><span class='violet'>explore</span>",
    "Lalit<span class='violet'>codes.</span>",
  ];

  useEffect(() => {
    const current = phrases[loopIndex % phrases.length];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      const updatedText = isDeleting
        ? current.substring(0, text.length - 1)
        : current.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === current) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopIndex(loopIndex + 1);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, loopIndex]);

  const handleProjectsClick = () => {
    navigate("/projects");
  };

  const handleDownloadCV = () => {
    window.open(resumePDF, "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/lalit-rajput-950220216", "_blank");
  };

  const handleGithubClick = () => {
    window.open("https://github.com/Rajputlalit", "_blank");
  };

  const handleMailClick = () => {
    window.open("mailto:lalitr826@gmail.com");
  };

  return (
    <section className="Landing">
      <div className="leftSide">
        <p>
          Hey I'm <strong>Lalit</strong>{" "}
          <span className="waving-hand">&#128075;</span>
        </p>

        <h2 id="animated">
          <span id="typewriter" dangerouslySetInnerHTML={{ __html: text }} />
          <span className="cursor">|</span>
        </h2>

        <p>
          I'm a frontend developer based in Hisar. I'll help you build beautiful
          websites your users will love.
        </p>

        {/* 🔹 New Button Group */}
        <div className="button-group">
          <button onClick={handleProjectsClick}>
            🚀 View Projects
          </button>
          <button onClick={handleDownloadCV}>
            📄 Download CV
          </button>
        </div>

        {/* 🔹 Social Icons */}
        <div className="social-icons">
  <Linkedin
    size={28}
    strokeWidth={1.8}
    className="social-icon linkedin"
    onClick={handleLinkedInClick}
  />
  <Github
    size={28}
    strokeWidth={1.8}
    className="social-icon github"
    onClick={handleGithubClick}
  />
  <Mail
    size={28}
    strokeWidth={1.8}
    className="social-icon mail"
    onClick={handleMailClick}
  />
</div>

      </div>

      <div className="rightSide">
        <div className="image-wrapper">
          <img src={myphoto} alt="Lalit - ReactJS Developer" />
        </div>
      </div>
    </section>
  );
}

export default Lalitcodes;
