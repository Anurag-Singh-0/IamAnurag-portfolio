import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="lg:outline lg:outline-white/30 lg:rounded-bl-xl lg:font-semibold">
      {["about", "skill", "project", "achieve", "contact"].map((path) => (
        <NavLink
          key={path}
          to={`/${path}`}
          className={({ isActive }) =>
            isActive
              ? "text-amber-300 transition-all duration-100"
              : "text-white/80 transition-all duration-100"
          }
          id="custom-navlink"
        >
          {path === "skill"
            ? "Skills"
            : path === "project"
            ? "Projects"
            : path === "achieve"
            ? "Achieve"
            : path === "contact"
            ? "Say Hi"
            : "About"}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
