import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./ScrollNavigator.css";

export default function ScrollNavigator() {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;

      setShowButton(scrollTop > 100); // show button after some scroll
      setIsAtBottom(windowHeight + scrollTop >= docHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  if (!showButton) return null;

  return (
    <button
      className="scroll-btn"
      onClick={isAtBottom ? scrollToTop : scrollToBottom}
      title={isAtBottom ? "Scroll to Top" : "Scroll to Bottom"}
    >
      {isAtBottom ? <FaArrowUp /> : <FaArrowDown />}
    </button>
  );
}
