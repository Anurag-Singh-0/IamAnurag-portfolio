import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchAbout } from "../services/api";
import {
  Laptop, Code, Database, Lightbulb, Camera, Video, Globe,
  FileText, Briefcase, MapPin, Calendar, School, Award
} from "lucide-react";

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetchAbout();
      if (response.data) setAboutData(response.data);
    } catch (error) {
      console.error("Error fetching about:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName) => {
    const iconClass = "text-amber-300 w-7 h-7";
    switch (iconName) {
      case 'Code': return <Code className={iconClass} />;
      case 'Database': return <Database className={iconClass} />;
      case 'Lightbulb': return <Lightbulb className={iconClass} />;
      case 'Camera': return <Camera className={iconClass} />;
      case 'Video': return <Video className={iconClass} />;
      case 'Globe': return <Globe className={iconClass} />;
      default: return <Laptop className={iconClass} />;
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-20 flex flex-col items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-amber-300 border-t-transparent"></div>
        <p className="mt-4 text-white/60 font-medium tracking-wide">Loading Profile...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-5xl mx-auto pb-10"
    >
      {/* Header with Subtitle */}
      <div className="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-4xl font-black text-white tracking-tight mb-4 relative inline-block after:block after:h-[6px] after:w-full after:bg-amber-300 after:rounded-full after:mt-2">
            About <span className="text-amber-300">Me</span>
          </h1>
          <p className="text-white/50 text-base sm:text-md max-w-xl mt-4 font-medium tracking-wide">
            Get to know more about my background, passion, and what drives me as a developer.
          </p>
        </div>
      </div>

      {/* 1. Bio & Resume Section  */}
      <div className="bg-[#18181a] border border-white/10 rounded-3xl p-8 sm:p-10 mb-16 shadow-xl">
        <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 font-medium w-full text-left tracking-wide">
          {aboutData?.bio || "Passionate Full-Stack Developer shaping ideas into scalable applications."}
        </p>

        {aboutData?.resumeLink && (
          <a
            href={aboutData.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-amber-300 text-black font-extrabold px-8 py-4 rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-[0_0_20px_rgba(253,224,71,0.2)] hover:shadow-[0_0_30px_rgba(253,224,71,0.4)] w-full sm:w-auto justify-center uppercase tracking-wider text-sm"
          >
            <FileText className="w-5 h-5" /> View Resume
          </a>
        )}
      </div>

      {/* 2. Experience Section */}
      {aboutData?.experience && aboutData.experience.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold text-white mb-8 flex items-center gap-3 tracking-tight">
            <Briefcase className="text-amber-300 w-8 h-8 sm:w-9 sm:h-9" /> Experience
          </h2>
          <div className="space-y-6">
            {aboutData.experience.map((exp, idx) => (
              <div key={idx} className="bg-[#0f0e0e] border border-white/10 hover:border-amber-300/30 rounded-2xl p-6 sm:p-8 transition-colors group">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">

                  {/* Left Side: Role & Company */}
                  <div className="flex-1">
                    <h3 className="text-md sm:text-xl font-bold text-white/90 mb-1.5 leading-snug tracking-wide transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-amber-300/90 font-semibold text-sm sm:text-base">
                      {exp.company}
                    </p>
                  </div>

                  {/* Right Side: Period & Location (Badges) */}
                  <div className="flex flex-col gap-2 shrink-0 md:text-right mt-2 md:mt-0">
                    <span className="flex items-center gap-2 text-white/50 text-xs sm:text-sm font-medium bg-white/5 px-3 py-1.5 rounded-lg w-fit md:ml-auto">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {exp.period}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-2 text-white/60 text-xs sm:text-sm font-medium w-fit md:ml-auto">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {exp.location}
                      </span>
                    )}
                  </div>

                </div>

                {/* Description */}
                <p className="text-white/60 leading-relaxed text-sm sm:text-base mt-3">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Education Section */}
      {aboutData?.education && aboutData.education.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold text-white mb-8 flex items-center gap-3 tracking-tight">
            <School className="text-amber-300 w-8 h-8 sm:w-9 sm:h-9" /> Education
          </h2>

          <div className="flex flex-col gap-6">
            {aboutData.education.map((edu, idx) => (
              <div key={idx} className="bg-[#0f0e0e] border border-white/10 hover:border-amber-300/30 rounded-2xl p-6 sm:p-8 transition-colors group">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                  {/* Left Side: Degree & Institution */}
                  <div className="flex-1">
                    <h3 className="text-md sm:text-xl font-bold text-white/90 mb-1.5 leading-snug tracking-wide transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-amber-300/90 font-semibold text-sm sm:text-base">
                      {edu.institution}
                    </p>
                  </div>

                  {/* Right Side: Period, Location & Status (Badges) */}
                  <div className="flex flex-col gap-2 shrink-0 md:text-right mt-2 md:mt-0">

                    {/* Period Badge */}
                    <span className="flex items-center gap-2 text-white/50 text-xs sm:text-sm font-medium bg-white/5 px-3 py-1.5 rounded-lg w-fit md:ml-auto">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {edu.period}
                    </span>

                    {/* Location Badge */}
                    {edu.location && (
                      <span className="flex items-center gap-2 text-white/60 text-xs sm:text-sm font-medium w-fit md:ml-auto">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {edu.location}
                      </span>
                    )}

                    {/* Status Badge */}
                    {edu.status && (
                      <span className="flex items-center gap-2 text-white/90 text-xs sm:text-sm font-medium w-fit md:ml-auto">
                        <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" /> {edu.status}
                      </span>
                    )}

                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. What I'm Doing Section */}
      {aboutData?.whatImDoing && aboutData.whatImDoing.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-8 tracking-tight">
            What I'm Doing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.whatImDoing.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0f0e0e] border border-white/5 hover:border-amber-300/30 hover:bg-[#0a0a0b] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 shrink-0 flex items-center justify-center shadow-inner group-hover:border-amber-300/30 transition-colors">
                  {getIcon(item.icon)}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white/90 tracking-wide transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </motion.div>
  );
}

export default About;