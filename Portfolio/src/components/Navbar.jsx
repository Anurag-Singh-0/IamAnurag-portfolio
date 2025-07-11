import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="lg:outline lg:outline-white/30 lg:rounded-bl-xl lg:font-semibold lg:shadow-xl/30">
      <NavLink
        id="custom-navlink"
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "text-amber-300 transition-all duration-100"
            : "text-white/80 transition-all duration-100"
        }
      >
        About
      </NavLink>

      <NavLink
        id="custom-navlink"
        to="/skill"
        className={({ isActive }) =>
          isActive
            ? "text-amber-300 transition-all duration-100"
            : "text-white/80 transition-all duration-100"
        }
      >
        Skills
      </NavLink>

      <NavLink
        id="custom-navlink"
        to="/project"
        className={({ isActive }) =>
          isActive
            ? "text-amber-300 transition-all duration-100"
            : "text-white/80 transition-all duration-100"
        }
      >
        Projects
      </NavLink>

      {/* <NavLink
        id="custom-navlink"
        to="/achieve"
        className={({ isActive }) =>
          isActive
            ? "text-amber-300 transition-all duration-100"
            : "text-white/80 transition-all duration-100"
        }
      >
        Achieve
      </NavLink> */}

      <NavLink
        id="custom-navlink"
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "text-amber-300 transition-all duration-100"
            : "text-white/80 transition-all duration-100"
        }
      >
        Say Hi!
      </NavLink>
    </nav>
  );
}

export default Navbar;
