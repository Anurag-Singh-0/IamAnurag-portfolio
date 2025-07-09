import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="absolute bg-[#282829] outline outline-white/30 top-0 right-0 lg:w-[60%] min-h-[10vh] w-full flex justify-between items-center px-8 rounded-bl-xl uppercase shadow-xl/30">
      <NavLink
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
        to="/project"
        className={({ isActive }) =>
          isActive
            ? "text-amber-300 transition-all duration-100"
            : "text-white/80 transition-all duration-100"
        }
      >
        Projects
      </NavLink>

      <NavLink
        to="/achieve"
        className={({ isActive }) =>
          isActive
            ? "text-amber-300 transition-all duration-100"
            : "text-white/80 transition-all duration-100"
        }
      >
        Achieve
      </NavLink>

      <NavLink
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
