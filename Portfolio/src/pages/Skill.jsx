import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Skillbox from '../components/Skillbox';
import { fetchSkills } from '../services/api';

function Skill() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllSkills();
  }, []);

  const fetchAllSkills = async () => {
    try {
      const response = await fetchSkills();
      const allSkills = response.data;

      // SORTING LOGIC: Sort skills oldest first
      allSkills.sort((a, b) => (a._id > b._id ? 1 : -1));

      const grouped = {};
      const categories = new Set(); // Set maintains strict insertion order

      allSkills.forEach((skill) => {
        const section = skill.category || 'Uncategorized';
        categories.add(section); // Adds category exactly when oldest skill appears
        if (!grouped[section]) {
          grouped[section] = [];
        }
        grouped[section].push(skill);
      });

      const sectionsArray = Array.from(categories).map((title) => ({
        title,
        skills: grouped[title],
      }));

      setSections(sectionsArray);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-20 flex flex-col items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-amber-300 border-t-transparent"></div>
        <p className="mt-4 text-white/60 font-medium tracking-wide">Loading skills...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {/* Header with Subtitle */}
      <div className="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 relative inline-block after:block after:h-[5px] after:w-full after:bg-amber-300 after:rounded-full after:mt-1">
            Technical <span className="text-amber-300">Skills</span>
          </h1>
          <p className="text-white/50 text-md max-w-xl mt-4">
            A comprehensive list of technologies and tools I use to build scalable and robust applications.
          </p>
        </div>
      </div>

      {/* Dynamic Sections */}
      <div className="space-y-14 sm:space-y-16 mt-8">
        {sections.length === 0 ? (
          <div className="bg-[#222224] rounded-2xl p-10 text-center outline outline-white/20">
            <p className="text-white/60 text-lg">No skills added yet.</p>
          </div>
        ) : (
          sections.map((section, index) => (
            <div key={index} className="bg-[#151515] p-6 sm:p-8 rounded-3xl outline outline-white/10">
              {/* Section Title */}
              <h2 className="text-xl sm:text-2xl font-bold uppercase mb-8 text-white/90 tracking-widest border-b border-white/5 pb-4 text-center sm:text-left">
                {section.title}
              </h2>

              {/* Skillboxes Grid - FIXED LINE */}
              <div className="flex flex-wrap gap-5 sm:gap-6 items-center justify-center sm:justify-start">
                {section.skills.map((skill) => (
                  <Skillbox
                    key={skill._id}
                    name={skill.name}
                    alt={skill.name}
                    img={skill.icon}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default Skill;