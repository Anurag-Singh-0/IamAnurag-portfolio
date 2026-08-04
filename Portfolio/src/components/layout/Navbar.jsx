import React from 'react';
import { NavLink } from "react-router-dom";

function Navbar() {
  
  const navLinkClass = ({ isActive }) => 
    `transition-all duration-300 font-medium tracking-wide whitespace-nowrap text-[3.5vw] sm:text-sm lg:text-base ${
      isActive 
        ? "text-amber-300" 
        : "text-white/70 hover:text-white"
    }`;

  return (
    <nav className="
      /* Base Flex & Spacing (Links pass-pass rahenge) */
      flex justify-center items-center gap-5 sm:gap-8 lg:gap-10
      z-50
      
      /* Glassmorphism Effect */
      bg-[#0a0a0a]/60 backdrop-blur-xl 
      border border-white/10
      shadow-[0_8px_32px_rgba(0,0,0,0.2)]
      
      /* Mobile & Tablet Styles (< 1024px) -> Fixed at Bottom */
      fixed bottom-0 left-0 w-full h-[10vh] rounded-t-3xl px-4
      
      /* Desktop Styles (>= 1024px) -> Absolute at Top Right */
      lg:absolute lg:top-0 lg:right-0 lg:bottom-auto lg:left-auto
      lg:w-fit lg:h-[4.5rem] lg:px-12 lg:rounded-none lg:rounded-bl-3xl lg:border-t-0 lg:border-r-0
    ">
      <NavLink to="/about" className={navLinkClass}>
        About
      </NavLink>

      <NavLink to="/skill" className={navLinkClass}>
        Skills
      </NavLink>

      <NavLink to="/project" className={navLinkClass}>
        Projects
      </NavLink>

      <NavLink to="/achieve" className={navLinkClass}>
        Achieve
      </NavLink>

      <NavLink to="/contact" className={navLinkClass}>
        Say Hi!
      </NavLink>
    </nav>
  );
}

export default Navbar;