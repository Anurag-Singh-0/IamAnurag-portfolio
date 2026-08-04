import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";
import { fetchAchievements } from "../services/api";

function Achieve() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllAchievements();
  }, []);

  const fetchAllAchievements = async () => {
    try {
      const response = await fetchAchievements();
      // Sorting: Newest achievements first
      const sortedAchievements = response.data.sort((a, b) => (a._id < b._id ? 1 : -1));
      setAchievements(sortedAchievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-20 flex flex-col items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-amber-300 border-t-transparent"></div>
        <p className="mt-4 text-white/60 font-medium tracking-wide">Loading milestones...</p>
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
      {/* Header with Subtitle */}
      <div className="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 relative inline-block after:block after:h-[5px] after:w-full after:bg-amber-300 after:rounded-full after:mt-1">
            Milestones & <span className="text-amber-300">Awards</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mt-4">
            A timeline of my certifications, major milestones, and professional achievements throughout my journey.
          </p>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {achievements.length === 0 ? (
          <div className="bg-[#222224] rounded-3xl p-12 text-center outline outline-white/20 col-span-full">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTrophy className="text-3xl text-white/20" />
            </div>
            <p className="text-white/60 text-lg">No achievements added yet.</p>
          </div>
        ) : (
          achievements.map((achievement) => (
            <motion.div
              key={achievement._id}
              whileHover={{ y: -5 }}
              className="group bg-[#222224] outline outline-white/20 hover:outline-amber-300/50 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 transition-all duration-300 h-full"
            >
              {/* Image Section */}
              <div className="flex-shrink-0 w-full sm:w-40 h-48 sm:h-40 bg-[#151515] rounded-2xl overflow-hidden relative outline outline-white/10">
                {achievement.image ? (
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaTrophy className="text-4xl text-white/10" />
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors leading-tight">
                  {achievement.title}
                </h3>
                
                <p className="text-white/60 text-sm line-clamp-3 mb-5 flex-1 leading-relaxed">
                  {achievement.description}
                </p>
                
                {/* Meta Info & Links */}
                <div className="flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-white/5">
                  {achievement.date && (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-white/60 bg-white/5 px-3 py-1.5 rounded-lg">
                      <FaCalendarAlt className="text-white/40" />
                      {new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}
                    </span>
                  )}
                  
                  {achievement.certificateLink && (
                    <a
                      href={achievement.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-300/10 hover:bg-amber-300 hover:text-black px-4 py-1.5 rounded-lg transition-colors duration-300"
                    >
                      <FaExternalLinkAlt /> View Credentials
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default Achieve;