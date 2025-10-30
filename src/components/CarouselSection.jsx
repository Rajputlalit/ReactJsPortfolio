// src/components/CarouselSection.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import { FaReact, FaCss3Alt, FaHtml5, FaGithub } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiFigma, SiCanva } from "react-icons/si";
import "swiper/css";
import "./CarouselSection.css";
// import Sayhi from "../components/Sayhi.jsx"; 

/* ✅ 1. Load ALL images from /src/assets/pics */
const imports = import.meta.glob("../assets/pics/*.{png,jpg,jpeg}", { eager: true });
const ALL_IMAGES = Object.values(imports).map((m) => m.default).filter(Boolean);



/* ✅ 2. Load screenshots (grouped by folder name under /screenshots) */
const importScreens = import.meta.glob("../assets/screenshots/**/*.{png,jpg,jpeg}", { eager: true });
const SCREENSHOT_MODULES = importScreens;
const GROUPED_SCREENSHOTS = {};
Object.keys(SCREENSHOT_MODULES).forEach((fullPath) => {
  const parts = fullPath.split("screenshots/");
  if (parts.length < 2) return;
  const rel = parts[1];
  const segs = rel.split("/");
  let group = "global";
  let filename = rel;
  if (segs.length > 1) {
    group = segs[0];
    filename = segs.slice(1).join("/");
  }
  GROUPED_SCREENSHOTS[group] = GROUPED_SCREENSHOTS[group] || [];
  const mod = SCREENSHOT_MODULES[fullPath];
  const src = mod && mod.default ? mod.default : mod;
  if (src) GROUPED_SCREENSHOTS[group].push(src);
});

/* ✅ 3. NEW: Load all MP4/WebM videos from /src/assets/videos (including nested folders) */
const importVideos = import.meta.glob("../assets/videos/**/*.{mp4,webm}", { eager: true });
const VIDEOS = Object.values(importVideos)
  .map((m) => (m && m.default) ? m.default : m)
  .filter(Boolean);

/* ✅ 4. Helpers */
const safeImages = ALL_IMAGES.length ? ALL_IMAGES : [""];
const safeScreensGlobal = GROUPED_SCREENSHOTS["global"]?.length ? GROUPED_SCREENSHOTS["global"] : [""];

function slugFromTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getScreensForCardByTitle(title) {
  const slug = slugFromTitle(title);
  return GROUPED_SCREENSHOTS[slug] && GROUPED_SCREENSHOTS[slug].length
    ? GROUPED_SCREENSHOTS[slug]
    : safeScreensGlobal;
}

/* ✅ 5. Your cards data (with video added for ReactJs Development) */
const CARDS = [
  {
    title: "Web Development",
    tech: [
      { label: "HTML", icon: <FaHtml5 /> },
      { label: "CSS", icon: <FaCss3Alt /> },
      { label: "JavaScript", icon: <SiJavascript /> },
    ],
    quote: "Building functional, responsive and visually balanced web interfaces.",
    details: `
      <strong>Turning ideas into interactive websites using HTML, CSS, and JavaScript.</strong><br><br>
      I focus on writing clean, structured HTML and styling it with modern CSS to create layouts that are responsive, accessible, and consistent across devices.<br><br>
      Along with that, I use JavaScript to add meaningful interactivity — like dynamic navigation, smooth animations, and user-friendly effects that bring life to the page.<br><br>
      <ul>
        <li>Responsive page layouts built from scratch with Flexbox & Grid</li>
        <li>Pixel-accurate CSS styling and animations</li>
        <li>Interactive features built using vanilla JavaScript</li>
        <li>Reusable and well-organized code for easy maintenance</li>
      </ul>
      <br>
      <em>My approach is simple: write clean code, focus on the user, and make every section feel natural to interact with.</em>
    `,
  },
  {
    title: "Web Design",
    tech: [
      { label: "Tailwind", icon: <SiTailwindcss /> },
      { label: "CSS", icon: <FaCss3Alt /> },
      { label: "Canva", icon: <SiCanva /> },
      // { label: "Figma", icon: <SiFigma /> },
    ],
    quote: "Designing modern and responsive layouts that communicate clearly.",
    details: `
      <strong>Design isn’t just about colors and shapes — it’s about clarity and purpose.</strong><br><br>
      I design web layouts that balance simplicity with visual appeal. I often take concept ideas or sample designs from platforms like Figma or Canva and turn them into working, responsive front-end layouts using plain CSS or Tailwind CSS.<br><br>
      <ul>
        <li>Converting design mockups from Figma or Canva into real web pages</li>
        <li>Modern UI layout building using Tailwind CSS and responsive grids</li>
        <li>Balancing typography, spacing, and color contrast for better UX</li>
        <li>Ensuring the design looks equally good on desktops and mobiles</li>
      </ul>
      <br>
      <em>I believe a well-structured design should guide users naturally — not make them think twice.</em>
    `,
  },
  {
    title: "ReactJs Development",
    tech: [
      { label: "React", icon: <FaReact /> },
      { label: "Tailwind", icon: <SiTailwindcss /> },
      { label: "GitHub", icon: <FaGithub /> },
    ],
    quote: "Transforming static layouts into dynamic, component-based web apps.",
    details: `
      <strong>Building scalable, component-driven web apps using React.js.</strong><br><br>
      I develop clean, reusable components in React that manage state effectively and make large projects maintainable. My focus is on structure, clarity, and creating UI that feels fast and consistent.<br><br>
      <ul>
        <li>Component-based UI development with Hooks and modular CSS</li>
        <li>Routing and navigation using React Router</li>
        <li>Clean folder structure and reusable code patterns</li>
        <li>Integration with Tailwind CSS for rapid UI prototyping</li>
      </ul>
      <br>
      <em>React allows me to blend logic and design smoothly — building interfaces that not only work but feel good to use.</em>
    `,
    videos : [VIDEOS[0]], // 👈 Add your video here (e.g. src/assets/videos/react-demo.mp4)
  },
];

/* --- Random Index Helper --- */
function nextRandomIndex(len, current) {
  if (len <= 1) return 0;
  let idx = current;
  while (idx === current) idx = Math.floor(Math.random() * len);
  return idx;
}

/* --- Single Card --- */
function CarouselCard({ title, tech, quote, images, index, onOpen }) {
  const [currentIdx, setCurrentIdx] = useState(() => Math.floor(Math.random() * images.length));
  const [nextIdx, setNextIdx] = useState(() => nextRandomIndex(images.length, currentIdx));
  const [crossfading, setCrossfading] = useState(false);
  const [paused, setPaused] = useState(false);
  const cardRef = useRef(null);

  /* Random image crossfade */
  useEffect(() => {
    if (!images.length || paused) return;
    const FADE_EVERY = 5000;
    const FADE_DURATION = 4000;
    const t = setTimeout(() => {
      setCrossfading(true);
      const end = setTimeout(() => {
        setCurrentIdx(nextIdx);
        setNextIdx(nextRandomIndex(images.length, nextIdx));
        setCrossfading(false);
      }, FADE_DURATION);
      return () => clearTimeout(end);
    }, FADE_EVERY);
    return () => clearTimeout(t);
  }, [images.length, nextIdx, paused]);

  const currentSrc = images[currentIdx] ?? "";
  const nextSrc = images[nextIdx] ?? "";

  function handleOpen(e) {
    e.stopPropagation();
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    onOpen?.(index, rect, cardRef.current);
  }

  return (
    <article
      className="card"
      ref={cardRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="img-frame">
        <img src={currentSrc} alt="" className="layer bottom" />
        <img src={nextSrc} alt="" className={`layer top ${crossfading ? "show" : ""}`} />
        <div className="hover-overlay">
          <p className="overlay-quote">“{quote}”</p>
        </div>
      </div>

      <button className="label title-btn" onClick={handleOpen}>
        {title}
      </button>

      <div className="tech">
        {tech.map((t, k) => (
          <span className="badge" key={k}>
            <i>{t.icon}</i>
            {t.label}
          </span>
        ))}
      </div>
    </article>
  );
}

/* --- Main Carousel Section --- */
export default function CarouselSection() {
  const images = useMemo(() => safeImages, []);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [overlayStyle, setOverlayStyle] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const overlayRef = useRef(null);
  const originRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = expandedIdx !== null ? "hidden" : "";
  }, [expandedIdx]);

  function handleOpen(index, rect, el) {
    originRef.current = { rect, el };
    setOverlayStyle({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      borderRadius: getComputedStyle(el)?.borderRadius || "18px",
    });
    setExpandedIdx(index);
    setShowContent(false);

    requestAnimationFrame(() => {
      setTimeout(() => {
        setAnimating(true);
        setOverlayStyle({
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: "20px",
        });
      }, 10);
    });
  }

  function onOverlayTransitionEnd() {
    if (!animating) return;
    setAnimating(false);
    setShowContent(true);
  }

  function handleClose() {
    const origin = originRef.current;
    if (!origin) {
      cleanup();
      return;
    }
    setShowContent(false);
    setAnimating(true);
    setOverlayStyle({
      left: origin.rect.left,
      top: origin.rect.top,
      width: origin.rect.width,
      height: origin.rect.height,
      borderRadius: getComputedStyle(origin.el)?.borderRadius || "18px",
    });

    function cleanup() {
      setAnimating(false);
      setExpandedIdx(null);
      setOverlayStyle(null);
      originRef.current = null;
    }
    overlayRef.current?.addEventListener("transitionend", cleanup, { once: true });
    setTimeout(cleanup, 700);
  }

  // function scrollToTop() {
  //   overlayRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  // }

  return (
    <section className="carousel-wrap">
      <div className="carousel-inner">
        <Swiper
          modules={[Autoplay, A11y]}
          loop
          speed={900}
          spaceBetween={24}
          slidesPerView={3}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {[...CARDS, ...CARDS, ...CARDS].map((c, i) => (
            <SwiperSlide key={i}>
              <CarouselCard {...c} images={images} index={i % CARDS.length} onOpen={handleOpen} />
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="global-quote">
          💭 “I believe great UI is not just pixels — it’s how people feel when they use a product.”
        </p>

    
          {overlayStyle && (
            <div
              ref={overlayRef}
              className={`expanded-overlay ${animating ? "animating" : ""}`}
              onTransitionEnd={onOverlayTransitionEnd}
              style={overlayStyle}
            >
              <div className={`expanded-panel-inner ${showContent ? "show" : ""}`}>
                <button className="close-btn" onClick={handleClose}>
            ×
                </button>
                <div className="expanded-content-columns">
            <div className="left">
              {(() => {
                const title = CARDS[expandedIdx]?.title || "";
                const parts = title.split(" ").filter(Boolean);
                return (
                  <h2 className="expanded-title">
              {parts.length ? (
                <>
                  <span className="title-highlight" style={{ color: "blueviolet" }}>
                    {parts[0]}
                  </span>
                  {parts.length > 1 ? " " + parts.slice(1).join(" ") : ""}
                </>
              ) : (
                title
              )}
                  </h2>
                );
              })()}
              <div className="expanded-tech">
                {CARDS[expandedIdx]?.tech.map((t, k) => (
                  <span className="badge" key={k}>
              <i>{t.icon}</i>
              {t.label}
                  </span>
                ))}
              </div>
              <p className="expanded-quote">{CARDS[expandedIdx]?.quote}</p>
              <div className="expanded-copy">
                {CARDS[expandedIdx]?.details && (
                  <p dangerouslySetInnerHTML={{ __html: CARDS[expandedIdx].details }}></p>
                )}
              </div>
            </div>

            <div className="right">
              <h3>
                <span style={{ color: "blueviolet" }}>Screenshots</span> &amp; Templates
              </h3>

              {/* ✅ Updated Screens + Video Section */}
                  <div className="screens-list">
                    {/* Show Screenshots */}
                    {(() => {
                      const screens = getScreensForCardByTitle(CARDS[expandedIdx]?.title || "") || [""];
                      return screens.map((src, k) => (
                        <div className="screenshot" key={`img-${k}`}>
                          {src ? <img src={src} alt={`screenshot-${k}`} /> : <div className="empty"></div>}
                        </div>
                      ));
                    })()}

                    {/* 👇 Show Videos (if available for this card) */}
                    {CARDS[expandedIdx]?.videos &&
                      CARDS[expandedIdx].videos.map((vid, i) => (
                        <div className="video-wrapper" key={`vid-${i}`}>
                          <video
                            src={vid}
                            controls
                            playsInline
                            loop
                            autoPlay
                            muted
                            preload="metadata"
                            className="service-video"
                          />
                        </div>
                      ))}
                  </div>

                  {/* <div className="panel-controls">
                    <button className="to-top-btn" onClick={scrollToTop}>
                      ↑ Top
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
{/* <Sayhi/> */}
    </section>
  );
}
