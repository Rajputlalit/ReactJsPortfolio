import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Skills from"./pages/Skills.jsx";
import Experience from "./pages/Experience.jsx";
import Projects from "./pages/Projects.jsx";
import GetinTouch from "./pages/GetinTouch.jsx";
// import NotFound from "./pages/NotFound.jsx";
import './App.css'
import Header from "./components/Header/Header.jsx";
import Lalitcodes from "./pages/Lalitcodes.jsx";
import Footer from "./components/footer/Footer.jsx";
// import "./Styles/responsive-helpers.css";
function App() {

  return (
    <>
    <div className='container'>
    <Header/>
    <Routes>
      <Route path ="/" element = {<Lalitcodes/>} />
      <Route path ="home" element = {<Home/>} />
      <Route path ="about" element = {<About/>} />
      <Route path ="skills" element = {<Skills/>} />
      <Route path ="experience" element = {<Experience/>} />
      <Route path ="projetcs" element = {<Projects/>} />
      <Route path ="getintouch" element = {<GetinTouch/>} />
      {/* <Route path ="notfound" element ={<NotFound/>} /> */}
    </Routes>
    <Footer/>
    </div>
    </>
    
  )
}

export default App