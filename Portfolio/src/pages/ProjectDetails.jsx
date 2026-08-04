import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaArrowLeft, FaGithub, FaLink, FaVideo, FaCode, 
  FaExclamationTriangle, FaLightbulb, FaImages, 
  FaTools, FaChartLine, FaListUl, FaUserTie, FaRegClock,
  FaChevronLeft, FaChevronRight, FaTimes
} from "react-icons/fa";
import { fetchProjects } from "../services/api";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Gallery Slider State
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await fetchProjects();
        const found = response.data.find(p => p._id === id);
        setProject(found);
      } catch (error) {
        console.error("Failed to load project details");
      } finally {
        setLoading(false);
      }
    };
    getProject();
    window.scrollTo(0, 0);
  }, [id]);

  // Keyboard navigation for Gallery Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentImageIndex === null || !project?.images) return;
      if (e.key === 'Escape') setCurrentImageIndex(null);
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex, project]);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  if (loading) return (
    <div className="h-full flex flex-col items-center justify-center py-40">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-300 mb-4"></div>
      <p className="text-white/50">Loading Case Study...</p>
    </div>
  );

  if (!project) return (
    <div className="text-center py-40 text-white/50">
      <h2 className="text-2xl font-bold mb-4">Case Study Not Found</h2>
      <button onClick={() => navigate('/project')} className="text-amber-300 hover:underline cursor-pointer">Return to Projects</button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto pb-10"
    >
      {/* Full Screen Image Slider Modal */}
      <AnimatePresence>
        {currentImageIndex !== null && project.images && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setCurrentImageIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-amber-300 text-2xl p-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer z-50"
              onClick={() => setCurrentImageIndex(null)}
            >
              <FaTimes />
            </button>
            
            <button 
              className="absolute left-4 md:left-10 text-white hover:text-amber-300 text-3xl p-4 bg-black/50 hover:bg-white/10 rounded-full transition-colors cursor-pointer z-50"
              onClick={handlePrev}
            >
              <FaChevronLeft />
            </button>

            <img 
              src={project.images[currentImageIndex]} 
              alt={`Gallery Expanded ${currentImageIndex + 1}`} 
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" 
              onClick={(e) => e.stopPropagation()} 
            />

            <button 
              className="absolute right-4 md:right-10 text-white hover:text-amber-300 text-3xl p-4 bg-black/50 hover:bg-white/10 rounded-full transition-colors cursor-pointer z-50"
              onClick={handleNext}
            >
              <FaChevronRight />
            </button>
            
            <div className="absolute bottom-6 left-0 right-0 flex justify-center text-white/50 font-medium tracking-widest">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button */}
      <button 
        onClick={() => navigate('/project')} 
        className="flex items-center gap-2 text-white/60 hover:text-amber-300 transition-colors mb-8 group cursor-pointer w-fit font-medium"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
      </button>

      {/* Header Info */}
      <div className="mb-12">
        <div className="mb-4">
          <span className="inline-block bg-amber-300/10 border border-amber-300/20 text-amber-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
            {project.category}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
          {project.title}
        </h1>
        <p className="text-xl text-white/60 mb-8 max-w-3xl leading-relaxed">
          {project.description}
        </p>
        
        {/* Action Links */}
        <div className="flex flex-wrap gap-4 border-b border-white/10 pb-10">
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-amber-300 hover:bg-amber-400 text-black font-bold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(252,211,77,0.2)] hover:-translate-y-1 cursor-pointer">
              <FaLink /> Live Application
            </a>
          )}
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#222] border border-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:-translate-y-1 cursor-pointer">
              <FaGithub className="text-xl" /> Source Code
            </a>
          )}
          {project.video && (
            <a href={project.video} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#222] border border-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:-translate-y-1 cursor-pointer">
              <FaVideo className="text-red-400 text-xl" /> View Demo
            </a>
          )}
        </div>
      </div>

      {/* Main Hero Thumbnail */}
      <div className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-16 bg-[#111]">
        <img src={project.thumbnail} alt={project.title} className="w-full h-auto max-h-[700px] object-cover object-top" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
        
        {/* Left Col: Deep Dive Details */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Problem */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                <FaExclamationTriangle className="text-red-400 text-xl" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-wide">The Problem</h2>
            </div>
            <p className="text-white/70 leading-relaxed whitespace-pre-line text-lg bg-[#151515] p-6 md:p-8 rounded-2xl border border-white/5 shadow-inner">
              {project.problem}
            </p>
          </section>

          {/* Solution */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                <FaLightbulb className="text-green-400 text-xl" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-wide">The Solution</h2>
            </div>
            <p className="text-white/70 leading-relaxed whitespace-pre-line text-lg bg-[#151515] p-6 md:p-8 rounded-2xl border border-white/5 shadow-inner">
              {project.solution}
            </p>
          </section>

          {/* Challenges Overcome */}
          {project.challenges && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20">
                  <FaTools className="text-purple-400 text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-wide">Technical Challenges</h2>
              </div>
              <p className="text-white/70 leading-relaxed whitespace-pre-line text-lg bg-[#151515] p-6 md:p-8 rounded-2xl border border-white/5 shadow-inner">
                {project.challenges}
              </p>
            </section>
          )}

          {/* Impact & Results */}
          {project.impact && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                  <FaChartLine className="text-blue-400 text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-wide">Impact & Results</h2>
              </div>
              <p className="text-white/70 leading-relaxed whitespace-pre-line text-lg bg-[#151515] p-6 md:p-8 rounded-2xl border border-white/5 shadow-inner">
                {project.impact}
              </p>
            </section>
          )}

          {/* Key Features List */}
          {project.features && project.features.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-300/10 p-3 rounded-xl border border-amber-300/20">
                  <FaListUl className="text-amber-300 text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-wide">Key Features</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="bg-[#151515] border border-white/5 p-4 rounded-xl flex items-start gap-3">
                    <span className="text-amber-300 mt-1">•</span>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

        </div>

        {/* Right Col: Sticky Information Panel */}
        <div>
          <div className="bg-[#151515] border border-white/5 rounded-2xl p-6 md:p-8 sticky top-8 shadow-xl">
            
            {/* Role & Timeline Section */}
            {(project.role || project.duration) && (
              <div className="space-y-6 mb-8 pb-8 border-b border-white/10">
                {project.role && (
                  <div>
                    <h4 className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                      <FaUserTie /> Role
                    </h4>
                    <p className="text-white/90 font-medium leading-relaxed">{project.role}</p>
                  </div>
                )}
                {project.duration && (
                  <div>
                    <h4 className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                      <FaRegClock /> Timeline
                    </h4>
                    <p className="text-white/90 font-medium">{project.duration}</p>
                  </div>
                )}
              </div>
            )}

            {/* Technologies */}
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaCode className="text-amber-300" /> Technologies
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {project.techStack?.map((tech, idx) => (
                <span key={idx} className="bg-[#0d0d0d] border border-white/10 text-white/80 text-sm font-medium px-4 py-2.5 rounded-lg shadow-sm hover:border-amber-300/30 hover:text-amber-300 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Flipkart-Style Project Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="pt-10 border-t border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-amber-300/10 p-3 rounded-xl border border-amber-300/20">
              <FaImages className="text-amber-300 text-xl" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-wide">Project Gallery</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {project.images.slice(0, 5).map((imgUrl, index) => {
              const isLastVisible = index === 4;
              const remainingImagesCount = project.images.length - 5;
              
              return (
                <div 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-[#111] rounded-2xl overflow-hidden border border-white/10 cursor-pointer shadow-lg hover:-translate-y-1 hover:shadow-amber-300/20 transition-all duration-300"
                >
                  <img 
                    src={imgUrl} 
                    alt={`Screenshot ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* +X Overlay on the 5th image if there are more */}
                  {isLastVisible && remainingImagesCount > 0 && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">+{remainingImagesCount}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

    </motion.div>
  );
}

export default ProjectDetails;