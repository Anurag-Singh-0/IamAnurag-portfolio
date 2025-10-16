import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import projectData from "../../data/project";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ComingSoon from "../../components/ComingSoon";

function Project() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  const handleMoreClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const categories = ["All", "Full-stack projects", "Front-end projects"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold relative inline-block after:block after:h-[5px] after:w-full after:bg-amber-300 after:rounded-full after:mt-1">
          Projects
        </h1>
      </div>

      {/* filters Action Buttons */}
      <div>
        <div className="lg:hidden relative">
          {/* Dropdown Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full outline outline-white/30 px-4 py-2 flex justify-between items-center rounded-lg text-white"
          >
            {selectedFilter}
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute z-10 bg-[#1a1a1a] w-full mt-2 rounded-lg shadow-lg border border-white/20 transition-all duration-200 ease-in-out origin-top
      ${isOpen ? "opacity-100" : "opacity-0"}
    `}
          >
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedFilter(category);
                  setIsOpen(false); // close dropdown
                }}
                className={`w-full text-left px-4 py-2 hover:bg-black/30 rounded-md ${
                  selectedFilter === category ? "text-amber-400" : "text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Filter Buttons */}
        <div className="hidden lg:flex items-center gap-8 p-3">
          {categories.map((category, idx) => (
            <button
              key={idx}
              className={`text-md cursor-pointer outline outline-white/20 px-5 py-1 rounded-2xl shadow-2xl ${
                selectedFilter === category ? "text-amber-400" : "text-white"
              } transition-all duration-200`}
              onClick={() => setSelectedFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Project Container */}
      <div className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectData.map((project, idx) =>
            project.status === "coming soon" ? (
              <ComingSoon
                key={idx}
                title={project.title}
                desc={project.desc}
                image={project.images[0]}
              />
            ) : (
              ""
            )
          )}

          {projectData
            .filter((project) =>
              selectedFilter === "All"
                ? true
                : project.category === selectedFilter
            )
            .map((project, idx) =>
              project.status === "complete" ? (
                <ProjectCard
                  key={idx}
                  img={project.images[0]}
                  alt={project.alt}
                  title={project.title}
                  desc={project.desc}
                  live={project.live}
                  repo={project.repo}
                  video={project.video}
                  onMore={() => handleMoreClick(project)}
                />
              ) : (
                ""
              )
            )}
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </motion.div>
  );
}

export default Project;
