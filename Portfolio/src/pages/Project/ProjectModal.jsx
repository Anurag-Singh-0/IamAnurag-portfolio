import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { motion } from "framer-motion";
import SocialHandle from "./SocialHandle";

function ProjectModal({ isOpen, onClose, project }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0); // Reset to first image when modal opens
  }, [project]);

  if (!isOpen || !project) return null;

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/30 backdrop-blur-md flex justify-center items-center px-4 py-8">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-black/40 backdrop-blur-[80px] custom-dialog rounded-2xl outline outline-white/20 text-white relative w-full max-w-[1000px] max-h-[90vh] overflow-hidden"
      >
        <div className="overflow-y-auto max-h-[80vh] custom-scroll">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-[red] duration-200 outline outline-white/30 z-900 p-3 rounded-full closeBtn"
          >
            <CloseIcon />
          </button>

          {/* Title */}
          <h1 className="lg:text-[2.2rem] text-[2rem] font-extrabold text-center py-4 bg-[#0c0c0c]/15 backdrop-blur-[40px] sticky top-0 left-0 z-80 proM-title">
            {project.title}
          </h1>

          {/* Image Slider */}
          <div className="proModel-imgBox relative flex justify-center items-center mb-5">
            {/* Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 text-white bg-black/30 hover:bg-black/50 hover:text-amber-400 duration-200 p-2 rounded-full z-10"
            >
              <NavigateBeforeIcon />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 text-white bg-black/30 hover:bg-black/50 hover:text-amber-400 duration-200 p-2 rounded-full z-10"
            >
              <NavigateNextIcon />
            </button>

            {/* Image */}
            <motion.img
              key={project.images[currentIndex]}
              src={project.images[currentIndex]}
              alt={project.title}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="h-full max-h-[60vh] w-auto object-contain rounded-xl"
            />
          </div>

          <div className="pl-5">
            <SocialHandle project={project}/>
          </div>

          {/* Description */}
          <div className="p-6 lg:text-lg text-[2.5vw] text-white/80 whitespace-pre-wrap pro-desc">
            {project.desc}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProjectModal;
