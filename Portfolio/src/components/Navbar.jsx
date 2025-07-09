import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="lg:absolute lg:top-0 lg:right-0 gap-3 bg-[#282829] outline outline-white/30 lg:w-[60%] lg:min-h-15 w-full flex justify-between items-center px-8 lg:rounded-bl-xl uppercase lg:shadow-xl/30  text-sm flex-wrap h-auto p-5">
      {["about", "skill", "project", "achieve", "contact"].map((path) => (
        <NavLink
          key={path}
          to={`/${path}`}
          className={({ isActive }) =>
            isActive
              ? "text-amber-300 transition-all duration-100"
              : "text-white/80 transition-all duration-100"
          }
        >
          {path === "skill"
            ? "Skills"
            : path === "project"
            ? "Projects"
            : path === "achieve"
            ? "Achieve"
            : path === "contact"
            ? "Say Hi!"
            : "About"}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
