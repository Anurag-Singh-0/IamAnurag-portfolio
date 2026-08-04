import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { fetchProjects } from "../services/api";
import { ChevronUp, ChevronDown, Filter } from "lucide-react";

function Project() {
  const [projects, setProjects] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      const response = await fetchProjects();
      // Sort projects by newest first
      const sortedProjects = response.data.sort((a, b) => (a._id < b._id ? 1 : -1));
      setProjects(sortedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // DYNAMIC CATEGORY LOGIC: Extract only those categories that actually have projects
  const categories = ["All", ...new Set(projects.map((project) => project.category))];

  // Filtered projects
  const filteredProjects = projects.filter((project) =>
    selectedFilter === "All" ? true : project.category === selectedFilter
  );

  if (loading) {
    return (
      <div className="text-white text-center py-20 flex flex-col items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-amber-300 border-t-transparent"></div>
        <p className="mt-4 text-white/60 font-medium tracking-wide">Loading masterpieces...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 relative inline-block after:block after:h-[5px] after:w-full after:bg-amber-300 after:rounded-full after:mt-1">
            Selected <span className="text-amber-300">Works</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mt-4">
            A showcase of my recent projects, highlighting problem-solving skills and technical expertise.
          </p>
        </div>
      </div>

      {/* Dynamic Filters Area */}
      <div className="mb-10">
        {/* Mobile Dropdown Filter */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-[#222224] outline outline-white/20 px-5 py-4 flex justify-between items-center rounded-2xl text-white font-medium"
          >
            <span className="flex items-center gap-2 text-amber-300">
              <Filter className="w-4 h-4" /> {selectedFilter} Projects
            </span>
            {isOpen ? <ChevronUp className="w-5 h-5 text-white/50" /> : <ChevronDown className="w-5 h-5 text-white/50" />}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-30 bg-[#222224] w-full mt-2 rounded-2xl outline outline-white/20 overflow-hidden"
              >
                {categories.map((category, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedFilter(category); setIsOpen(false); }}
                    className={`w-full text-left px-6 py-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${
                      selectedFilter === category ? "text-amber-300 font-bold bg-amber-300/5" : "text-white/70"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Pill Filters */}
        <div className="hidden lg:flex flex-wrap items-center gap-3 bg-[#0d0c0c] p-2 rounded-full outline outline-white/20 w-fit">
          {categories.map((category, idx) => (
            <button
              key={idx}
              className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                selectedFilter === category
                  ? "bg-amber-300 text-black shadow-md"
                  : "bg-transparent text-white/60 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setSelectedFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with Layout Animations */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="col-span-full text-center py-20 bg-[#222224] rounded-3xl outline outline-white/20"
            >
              <p className="text-white/40 text-lg">No projects found in this category.</p>
            </motion.div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default Project;