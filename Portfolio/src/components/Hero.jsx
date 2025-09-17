import { Route, Routes, Navigate } from "react-router-dom";
import About from "../pages/About/About";
import Skill from "../pages/Skill/Skill";
import Project from "../pages/Project/Project";
import Achieve from "../pages/Achieve/Achieve";
import Contact from "../pages/Contact/Contact";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <div className="bg-[#1e1e1fd4] w-full min-h-[100vh] rounded-xl outline outline-white/30 p-6 sm:p-8 text-white pb-16 mb-20 lg:pb-10 overflow-hidden custom-hero relative">
      <Navbar />
      <div className="lg:pt-0">
        <Routes>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route path="/about" element={<About />}></Route>
          <Route path="/skill" element={<Skill />}></Route>
          <Route path="/project/*" element={<Project />}></Route>
          <Route path="/achieve" element={<Achieve />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Hero;
