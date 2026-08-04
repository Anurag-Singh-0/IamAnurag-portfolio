import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchAbout } from "../services/api";
import Card from "../components/Card";
import { Laptop, Lightbulb, Camera, School, FileText } from "lucide-react";

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetchAbout();
      if (response.data) {
        setAboutData(response.data);
      }
    } catch (error) {
      console.error("Error fetching about:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-20 flex flex-col items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-amber-300 border-t-transparent"></div>
        <p className="mt-4 text-white/60 font-medium tracking-wide">Loading about info...</p>
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
      {/* Header with Subtitle */}
      <div className="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 relative inline-block after:block after:h-[5px] after:w-full after:bg-amber-300 after:rounded-full after:mt-1">
            About <span className="text-amber-300">Me</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mt-4">
            Get to know more about my background, passion, and what drives me as a developer.
          </p>
        </div>
      </div>

      {/* Bio & Resume Section */}
      <div className="bg-[#222224] outline outline-white/20 rounded-3xl p-6 sm:p-10 mb-12">
        <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8">
          {aboutData?.bio || "No bio added yet. Please update from admin panel."}
        </p>
        
        {aboutData?.resumeLink && (
          <a
            href={aboutData.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-300 text-black font-bold px-8 py-3.5 rounded-xl hover:bg-amber-400 transition-colors duration-200 shadow-md w-full sm:w-auto justify-center"
          >
            <FileText className="w-5 h-5" /> View Resume
          </a>
        )}
      </div>

      {/* What I'm Doing Section */}
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">What I'm Doing</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            icon={<Laptop className="text-amber-300 w-8 h-8" />}
            title="Web Development"
            desc="Building full-stack projects with HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB."
          />
          <Card
            icon={<Lightbulb className="text-amber-300 w-8 h-8" />}
            title="Data Structures & Algorithms"
            desc="Practicing DSA using Java to sharpen my problem-solving skills and build a robust foundation for engineering roles."
          />
          <Card
            icon={<Camera className="text-amber-300 w-8 h-8" />}
            title="Capturing the Moment"
            desc="I love clicking photos and capturing everyday moments. Photography helps me see the beauty in details and share my creative perspective."
          />
        </div>
      </div>

      {/* Education Section */}
      <div className="mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Education</h2>

        <div className="bg-[#141415] outline outline-white/20 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
            <div className="p-3 bg-amber-300/10 rounded-2xl outline outline-amber-300/20">
              <School className="text-amber-300 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Babu Banarasi Das University</h3>
              <p className="text-sm text-white/50">Lucknow, Uttar Pradesh</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white">Bachelor of Computer Applications (BCA) - Data Science & AI</h4>
            <p className="text-sm text-amber-300 font-medium">Final Year Student</p>
            <div className="flex flex-wrap gap-x-4 mt-2 text-sm text-white/60 bg-[#080808] p-3 rounded-xl w-fit outline outline-white/5">
              <span>Period: 2023 – 2026</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;