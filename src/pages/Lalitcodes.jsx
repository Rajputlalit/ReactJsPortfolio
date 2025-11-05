import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "./Lalitcodes.css";
import myphoto from "../assets/png/png/Lalit.png";
import { FaEnvelope } from "react-icons/fa";

function Lalitcodes() {
  const [activeButton, setActiveButton] = useState(null);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleLinkedInClick = () => {
    setActiveButton("linkedin");
    window.open("https://www.linkedin.com/in/lalit-rajput-950220216", "_blank");
  };

  const handleGithubClick = () => {
    setActiveButton("github");
    window.open("https://github.com/Rajputlalit", "_blank");
  };

  const handleProjectsClick = () => {
    setActiveButton("projects");
    navigate("/projects");
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

        <div className="button-group">
          <button
            className={activeButton === "linkedin" ? "active" : ""}
            onClick={handleLinkedInClick}
          >
            <FaLinkedin size={22} style={{ marginRight: "8px" }} />
            LinkedIn
          </button>
          <button
            className={activeButton === "github" ? "active" : ""}
            onClick={handleGithubClick}
          >
            <FaGithub style={{ marginRight: "8px" }} /> GitHub
          </button>
          <button
            className={activeButton === "projects" ? "active" : ""}
            onClick={handleProjectsClick}
          >
            🚀 Browse Projects
          </button>
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
