import React, { useState } from 'react';
import { motion } from "framer-motion";
import { images } from "../Images";

// React Icons (Font Awesome + Feather)
import { FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter, FaCamera } from "react-icons/fa";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const iconStyle = "text-amber-300 text-[28px]";

const Sidebar = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-[#1e1e1f9d] w-full rounded-xl outline outline-white/30 text-[#FAFAFA] h-auto lg:h-full relative overflow-hidden flex flex-col">
      {/* ADDED: flex flex-col and lg:h-full so the inner div can take remaining space and scroll */}

      {/* Mobile Toggle Button - Exact right-0 top-0 edge */}
      <div className="lg:hidden absolute top-0 right-0 z-30">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="outline-l outline-b outline-white/30 px-3.5 py-2.5 shadow-md transition duration-200 rounded-bl-2xl bg-[#2B2B2C] cursor-pointer text-white hover:text-amber-300 flex items-center justify-center"
        >
          {showDetails ? <FiChevronUp className="text-[20px]" /> : <FiChevronDown className="text-[20px]" />}
        </button>
      </div>

      <div className="overflow-y-auto flex-1 px-5 sm:px-10 pt-6 pb-8 sm:py-8 hide-scrollbar">
        {/* Profile section */}
        <motion.div
          className="relative mb-2 lg:mb-5 pr-16 lg:pr-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex lg:flex-col lg:justify-center items-center flex-row gap-4 sm:gap-5">
            <div className="flex-shrink-0">
              <img
                src={images.model3}
                alt="Avatar"
                className="rounded-2xl lg:mb-0 w-20 h-20 md:w-34 md:h-34 lg:w-34 lg:h-34 object-cover object-center border-4 border-white/20 shadow-lg"
              />
            </div>
            <div className="text-center lg:text-center">
              <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-1.5 sm:mb-2 whitespace-nowrap tracking-tight">
                Anurag Singh
              </h1>
              <p className="bg-[#2B2B2C] px-3.5 py-1 text-[0.65rem] sm:text-xs rounded-full shadow-lg text-gray-300 font-medium inline-block whitespace-nowrap outline outline-white/10">
                Full Stack Developer
              </p>
            </div>
          </div>
        </motion.div>

        {/* Details section with animation */}
        <motion.div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${showDetails ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"
            } lg:max-h-none lg:opacity-100 lg:block`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <hr className="w-full border-white/20 my-4 lg:mb-6" />

          {/* Contact Info */}
          <motion.div
            className="flex flex-col gap-6 lg:gap-8 mb-6 lg:mb-7"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {[
              {
                icon: <FaEnvelope className={iconStyle} />,
                label: "Email",
                value: (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="mailto:singh.anurag2026@gmail.com"
                    className="text-[13px] text-white/90 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]"
                  >
                    singh.anurag2026@gmail.com
                  </a>
                ),
              },
              {
                icon: <FaPhone className={iconStyle} />,
                label: "Phone",
                value: (
                  <a href='tel:7678936521' className="text-[13px] text-white/90">+91 7678936521</a>
                ),
              },
              {
                icon: <FaCalendarAlt className={iconStyle} />,
                label: "Birthday",
                value: (
                  <span className="text-[13px] text-white/90 uppercase">
                    Feb 8, 2004
                  </span>
                ),
              },
              {
                icon: <FaMapMarkerAlt className={iconStyle} />,
                label: "Location",
                value: (
                  <span className="text-[13px] text-white/90">
                    Lucknow, Uttar Pradesh, India
                  </span>
                ),
              },
            ].map((item, i) => (
              <motion.div
                className="flex gap-3 items-center"
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <span className="bg-[#2B2B2C] p-3 rounded-xl shadow-md hover:scale-105 transition-all duration-200">
                  {item.icon}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 uppercase">
                    {item.label}
                  </span>
                  {item.value}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider Line before Socials */}
          <hr className="w-full border-white/20 mb-6" />

          {/* Social Icons - Dock Style */}
          <motion.div
            className="flex justify-around items-center text-white/70 bg-white/5 border border-white/10 px-4 py-3.5 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.2)] backdrop-blur-sm mb-4 lg:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/anurag.singh_04"
              className="hover:text-amber-300 hover:-translate-y-1 hover:scale-110 transition-all duration-300"
            >
              <FaInstagram className="text-[26px] sm:text-[28px]" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/singhanurag2024/"
              className="hover:text-amber-300 hover:-translate-y-1 hover:scale-110 transition-all duration-300"
            >
              <FaLinkedin className="text-[26px] sm:text-[28px]" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Anurag-Singh-0"
              className="hover:text-amber-300 hover:-translate-y-1 hover:scale-110 transition-all duration-300"
            >
              <FaGithub className="text-[26px] sm:text-[28px]" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/Anurag_singh_09"
              className="hover:text-amber-300 hover:-translate-y-1 hover:scale-110 transition-all duration-300"
            >
              <FaTwitter className="text-[26px] sm:text-[28px]" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://pixabay.com/users/only_realclicks-51200075/"
              className="hover:text-amber-300 hover:-translate-y-1 hover:scale-110 transition-all duration-300"
            >
              <FaCamera className="text-[26px] sm:text-[28px]" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;