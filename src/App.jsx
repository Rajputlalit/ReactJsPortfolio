import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Skills from "./pages/Skills.jsx";
import Experience from "./pages/Experience.jsx";
import Projects from "./pages/Projects.jsx";
import GetinTouch from "./pages/GetinTouch.jsx";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Lalitcodes from "./pages/Lalitcodes.jsx";
import Footer from "./components/footer/Footer.jsx";
import ScrollNavigator from "./components/ScrollNavigator.jsx";
// import About from "../components/About.jsx";



function App() {
  const location = useLocation();

  // ✅ Hide footer on landing & GetInTouch
  const hideFooterPaths = ["/", "/GetinTouch"];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname.toLowerCase());

  return (
    <>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Lalitcodes />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<Projects />} />
          <Route path="experience" element={<Experience />} />
          <Route path="getintouch" element={<GetinTouch />} />
        </Routes>

        {/* ✅ Render footer only where needed */}
        {shouldShowFooter && <Footer />}
        {/* {shouldShowFooter && <Footer />} */}
<ScrollNavigator />

      </div>
    </>
  );
}

export default App;
