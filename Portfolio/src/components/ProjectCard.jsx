import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!project.isComingSoon) {
      navigate(`/project/${project._id}`);
    }
  };

  return (
    <motion.div
      layout 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={!project.isComingSoon ? { y: -8 } : {}}
      onClick={handleClick}
      className={`relative group bg-[#222224] outline outline-white/20 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full
        ${!project.isComingSoon ? 'cursor-pointer hover:outline-amber-300/50' : 'cursor-not-allowed'}`}
    >
      {/* Project Thumbnail Image */}
      <div className="h-56 sm:h-64 w-full overflow-hidden relative bg-[#1e1e1fd4]">
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 
            ${project.isComingSoon ? 'blur-[4px] opacity-50 grayscale-[50%]' : ''}`}
        />
        
        {/* Overlay for Coming Soon */}
        {project.isComingSoon && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px]">
            <span className="bg-amber-300 text-black px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs">
              Coming Soon
            </span>
          </div>
        )}

        {/* Category Badge */}
        {!project.isComingSoon && (
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md outline outline-white/20 text-white/90 text-xs px-4 py-1.5 rounded-full font-medium tracking-wide">
            {project.category}
          </div>
        )}
      </div>

      {/* Details Area */}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <h1 className="text-2xl font-extrabold text-white mb-3 group-hover:text-amber-300 transition-colors line-clamp-1">
          {project.title}
        </h1>
        <p className="text-white/50 text-sm line-clamp-2 leading-relaxed flex-1 mb-6">
          {project.description}
        </p>

        {/* Tech Stack Preview */}
        {!project.isComingSoon && project.techStack && project.techStack.length > 0 && (
          <div className="flex items-center gap-2 mt-auto pt-5 border-t border-white/5 flex-wrap">
            {project.techStack.slice(0, 3).map((tech, i) => (
              <span key={i} className="text-[11px] font-bold tracking-wider text-amber-300 bg-amber-300/5 border border-amber-300/20 px-3 py-1.5 rounded-md">
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-[11px] font-medium text-white/40 px-2 bg-white/5 py-1.5 rounded-md">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ProjectCard;