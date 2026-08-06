import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { fetchProjects } from "../services/api";
import { ChevronUp, ChevronDown, Filter } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";

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
      // Sort projects by newest first by default
      const sortedProjects = response.data.sort((a, b) => (a._id < b._id ? 1 : -1));
      setProjects(sortedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Separate Products from regular Projects
  // Products sorted by oldest first (first added stays on top)
  const myProducts = projects
    .filter(p => p.type === 'product')
    .sort((a, b) => (a._id > b._id ? 1 : -1)); 

  // Portfolio projects remain newest first
  const portfolioProjects = projects.filter(p => p.type !== 'product');

  // DYNAMIC CATEGORY LOGIC based ONLY on portfolioProjects
  const categories = ["All", ...new Set(portfolioProjects.map((project) => project.category))];

  // Filtered projects
  const filteredProjects = portfolioProjects.filter((project) =>
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
          <h1 className="text-4xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 relative inline-block after:block after:h-[5px] after:w-full after:bg-amber-300 after:rounded-full after:mt-1">
            Projects
          </h1>
          <p className="text-white/50 text-md max-w-xl mt-4">
            A showcase of my recent projects, highlighting problem-solving skills and technical expertise.
          </p>
        </div>
      </div>

      {/* PREMIUM UNIQUE PRODUCT SECTION */}
      {myProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-[11px] font-bold text-white/40 tracking-[0.2em] uppercase mb-4 ml-1">
            Product
          </h2>
          <div className="flex flex-col gap-6">
            {myProducts.map((product) => (
              <div 
                key={product._id} 
                onClick={() => product.liveLink && window.open(product.liveLink, '_blank', 'noopener,noreferrer')}
                className={`relative overflow-hidden bg-gradient-to-br from-[#1e1e1f] to-[#151515] border border-white/10 rounded-3xl p-6 sm:p-8 transition-all duration-500 shadow-xl ${product.liveLink ? 'cursor-pointer group hover:-translate-y-1.5 hover:shadow-[0_15px_40px_-10px_rgba(253,224,71,0.15)] hover:border-amber-300/40' : ''}`}
              >
                {/* Subtle Ambient Glow Effect inside the card */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-amber-300/5 rounded-full blur-[50px] group-hover:bg-amber-300/15 transition-colors duration-500 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5">
                  <div>
                    {/* Live Pulsing Indicator */}
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-amber-300/80 font-bold">Featured Product</span>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors duration-300">
                      {product.title}
                    </h3>
                  </div>
                  
                  {product.liveLink && (
                    <div className="flex items-center gap-2 text-sm font-semibold text-white/60 bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl group-hover:bg-amber-300 group-hover:text-black group-hover:border-amber-300 transition-all duration-300 mt-2 sm:mt-0 shadow-sm">
                      Visit<FaExternalLinkAlt className="text-[11px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  )}
                </div>
                
                <p className="relative z-10 text-white/60 text-[15px] sm:text-base leading-relaxed mb-8 max-w-3xl group-hover:text-white/80 transition-colors duration-300">
                  {product.description}
                </p>
                
                {product.metrics && product.metrics.length > 0 && (
                  <div className="relative z-10 flex flex-wrap gap-3">
                    {product.metrics.map((metric, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-bold tracking-wide text-white/70 bg-[#0d0d0d] border border-white/10 px-4 py-2 rounded-lg group-hover:border-amber-300/30 group-hover:text-amber-300 transition-colors duration-300 shadow-inner"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PORTFOLIO PROJECTS HEADER - Shows ONLY if there is at least one Product above it */}
      {myProducts.length > 0 && portfolioProjects.length > 0 && (
        <h2 className="text-[11px] font-bold text-white/40 tracking-[0.2em] uppercase mb-4 ml-1">
          Projects
        </h2>
      )}

      {/* Dynamic Filters Area */}
      {portfolioProjects.length > 0 && (
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
      )}

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