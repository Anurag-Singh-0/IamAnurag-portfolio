import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaExternalLinkAlt } from "react-icons/fa";
import { fetchAchievements } from "../services/api";

// Silky Smooth Auto-Sliding Image Carousel Component
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    // Auto slide every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video flex items-center justify-center bg-[#151515] rounded-3xl">
        <FaTrophy className="text-6xl text-white/5" />
      </div>
    );
  }

  return (
    // Height will automatically adapt to the first image's aspect ratio without any blur
    <div className="relative w-full rounded-3xl overflow-hidden bg-[#151515] shadow-lg">
      
      {/* Invisible dummy image to set the dynamic container height naturally */}
      <img 
        src={images[0]} 
        alt="layout setter" 
        className="w-full h-auto invisible block pointer-events-none" 
      />

      {/* Actual Images with Pure CSS cross-fade for zero lag */}
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Achievement Image ${idx + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Slider Indicators (Dots) matching reference image */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex 
                  ? "bg-amber-300 w-2 h-2 shadow-[0_0_5px_rgba(253,224,71,0.8)]" 
                  : "bg-white/40 hover:bg-white/80 w-2 h-2"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function Achieve() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllAchievements();
  }, []);

  const fetchAllAchievements = async () => {
    try {
      const response = await fetchAchievements();
      // Sorting: Newest achievements first based on date
      const sortedAchievements = response.data.sort((a, b) => (new Date(b.date) - new Date(a.date)));
      setAchievements(sortedAchievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format date to match reference: "Date • December 1, 2023"
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="text-white text-center py-24 flex flex-col items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-300 border-t-transparent"></div>
        <p className="mt-5 text-white/60 font-semibold tracking-wide">Fetching Data...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Header with Simple Title */}
      <div className="mb-14 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 relative inline-block after:block after:h-[5px] after:w-full after:bg-amber-300 after:rounded-full after:mt-1">
            <span className="text-white">Achievements</span>
          </h1>
          <p className="text-white/50 text-md mt-4 max-w-xl leading-relaxed">
            My certifications, technical milestones, and professional journey.
          </p>
        </div>
      </div>

      {/* Achievements 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        {achievements.length === 0 ? (
          <div className="bg-[#222224] rounded-3xl p-14 text-center outline outline-white/20 shadow-2xl col-span-full">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-5 outline outline-white/10">
              <FaTrophy className="text-4xl text-white/20" />
            </div>
            <p className="text-white/60 text-lg font-medium">No achievements added yet.</p>
          </div>
        ) : (
          achievements.map((achievement, index) => {
            // Support both new multiple images array and old single image string
            const displayImages = achievement.images?.length > 0 
              ? achievement.images 
              : (achievement.image ? [achievement.image] : []);

            return (
              <motion.div
                key={achievement._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col group"
              >
                {/* Media Section (Auto-Slider dynamic box) */}
                <div className="w-full mb-6 relative rounded-3xl overflow-hidden outline outline-white/5 hover:outline-amber-300/30 transition-all duration-300">
                  <ImageCarousel images={displayImages} />
                </div>

                {/* Highlighted Content Section */}
                <div className="flex flex-col flex-1 px-2">
                  
                  {/* Highlighted Date */}
                  {achievement.date && (
                    <p className="text-amber-300/80 text-[14px] font-semibold tracking-wide uppercase mb-3">
                      Date • <span className="text-white/60 normal-case tracking-normal">{formatDate(achievement.date)}</span>
                    </p>
                  )}
                  
                  {/* Highlighted Title */}
                  <h3 className="text-2xl sm:text-[28px] font-extrabold text-white leading-tight mb-4 group-hover:text-amber-300 transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  
                  {/* Highlighted Description */}
                  <p className="text-white/70 text-[15.5px] sm:text-base leading-relaxed mb-6 font-medium">
                    {achievement.description}
                  </p>
                  
                  {/* Clean Footer Link */}
                  {achievement.certificateLink && (
                    <div className="mt-auto pt-2">
                      <a
                        href={achievement.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 text-sm font-bold text-amber-300 bg-amber-300/10 hover:bg-amber-300 hover:text-black px-5 py-2.5 rounded-xl transition-colors duration-300"
                      >
                        <FaExternalLinkAlt className="text-xs" /> View Credential
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}

export default Achieve;