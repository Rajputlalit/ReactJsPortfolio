import React, { useState, useEffect } from "react";
import "./Home.css";
import CarouselSection from "../components/CarouselSection.jsx";
// import Sayhi from "../components/Sayhi.jsx";
import WhyWorkWithMe from "../components/WhyWorkWithMe";
// import ContactForm from "../components/ContactForm";
// import CTASection from "../components/CTASection";
import GalaxySection from "../components/GalaxySection";
// import GalaxyCTA from "../components/GalaxyCTA";




function Home() {
  const [text, setText] = useState(""); // stores the current text being typed
  const [isDeleting, setIsDeleting] = useState(false); // true when erasing
  const [loopIndex, setLoopIndex] = useState(0); // which phrase we are on
  const [typingSpeed, setTypingSpeed] = useState(100); // controls speed

  // ✨ phrases to type one by one
  const phrases = [
    "Services I Offer...",
    "Develop,",
    "Design,",
    "and Deploy...",
  ];

  useEffect(() => {
    const current = phrases[loopIndex % phrases.length];

    // Set typing or deleting speed (dots will appear slower naturally)
    const currentChar = current.charAt(text.length);
let speed = isDeleting ? 90 : typingSpeed;

// Slow down slightly when typing dots
if (currentChar === ".") speed = 250;


    const timeout = setTimeout(() => {
      const updatedText = isDeleting
        ? current.substring(0, text.length - 1) // erase
        : current.substring(0, text.length + 1); // type

      setText(updatedText);

      // ✅ If typing completed
      if (!isDeleting && updatedText === current) {
        // Pause before erasing
        setTimeout(() => setIsDeleting(true), 800);
      }

      // ✅ If erasing completed
      else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopIndex(loopIndex + 1); // next phrase
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, loopIndex]);

  return (
<>
    <div className="home">
      <h1 className="typewriter">
        {text}
        <span className="cursor">|</span>
      </h1>

      {/* Your Carousel Section Below */}
      <CarouselSection />
      <WhyWorkWithMe />
        {/* <GalaxyCTA /> */}

  <GalaxySection/>

      
      </div>
</>

    
  );
}

export default Home;

