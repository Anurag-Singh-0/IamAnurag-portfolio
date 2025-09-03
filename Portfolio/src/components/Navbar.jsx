import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-around items-center
        w-full
        h-[4rem]
        absolute
        z-50
        bg-black/20 backdrop-blur-lg border border-white/20
        /* Small screens → bottom */
        bottom-0 rounded-bl-2xl
        /* Large screens → top right */
        lg:top-0 lg:right-0 lg:bottom-auto lg:w-[70%] lg:rounded-bl-xl">
      <NavLink
        to="/about"
        className={({ isActive }) => isActive ? "custom-navlink text-amber-300 transition-all duration-100" : "text-white/80 transition-all duration-100"
        }
      >
        About
      </NavLink>

      <NavLink
        to="/skill"
        className={({ isActive }) =>
          isActive
            ? "custom-navlink text-amber-300 transition-all duration-100"
            : "text-white/80 transition-all duration-100"
        }
      >
        Skills
      </NavLink>

      <NavLink
        to="/project"
        className={({ isActive }) =>
          isActive
            ? "custom-navlink text-amber-300 transition-all duration-100"
            : "text-white/80 transition-all duration-100"
        }
      >
        Projects
      </NavLink>

      {/* <NavLink
        to="/achieve"
        className={({ isActive }) =>
          isActive
            ? "custom-navlink text-amber-300 transition-all duration-100"
            : "text-white/80 transition-all duration-100"
        }
      >
        Achieve
      </NavLink> */}

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "custom-navlink text-amber-300 transition-all duration-100"
            : "text-white/80 transition-all duration-100"
        }
      >
        Say Hi!
      </NavLink>
    </nav>
  );
}

export default Navbar;
