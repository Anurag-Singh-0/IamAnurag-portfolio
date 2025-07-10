import { useState } from "react";
import { motion } from "framer-motion";
import { images } from "../Images";

// Material Icons
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const iconStyle = "text-amber-300 text-[28px]";

const Sidebar = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-[#1e1e1f9d] w-full rounded-xl outline outline-white/30 text-[#FAFAFA] h-auto">
      {/* Mobile Toggle Button */}
      <div className="flex lg:hidden justify-end mb-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="outline outline-white/30 px-2 py-2 shadow transition duration-200 rounded-bl-xl rounded-tr-xl"
        >
          {showDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </button>
      </div>

      <div className="h-auto max-h-[calc(100vh-10px)] overflow-y-auto px-6 sm:px-10 py-10 hide-scrollbar">
        {/* Profile section */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center gap-2 profile custom-profile">
            <div>
              <img
                src="/Favicon.jpg"
                alt="Avatar"
                className="rounded-full mb-4 w-40 h-40 object-cover object-center border-4 border-white/20 shadow-lg"
              />
            </div>
            <div>
              <h1 className="font-bold uppercase text-2xl sm:text-3xl mb-2 text-center">
                Anurag Singh
              </h1>
              <p className="bg-[#2B2B2C] px-4 py-1.5 text-sm rounded-full shadow-lg text-gray-300 font-medium text-center">
                Full Stack Developer
              </p>
            </div>
          </div>
        </motion.div>

        {/* Details section with animation */}
        <motion.div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showDetails ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          } lg:max-h-none lg:opacity-100 lg:block`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <hr className="w-full border-white/20 mb-6" />

          {/* Contact Info */}
          <motion.div
            className="flex flex-col gap-8 mb-7"
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
                icon: <MarkunreadOutlinedIcon className={iconStyle} />,
                label: "Email",
                value: (
                  <a
                    target="__blank"
                    href="mailto:singh.anurag2026@gmail.com"
                    className="text-[13px] text-white/90 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]"
                  >
                    singh.anurag2026@gmail.com
                  </a>
                ),
              },
              {
                icon: <SmartphoneOutlinedIcon className={iconStyle} />,
                label: "Phone",
                value: (
                  <a
                    href="tel:7678936521"
                    className="text-[13px] text-white/90"
                  >
                    +91 7********1
                  </a>
                ),
              },
              {
                icon: <CalendarMonthOutlinedIcon className={iconStyle} />,
                label: "Birthday",
                value: (
                  <span className="text-[13px] text-white/90 uppercase">
                    Feb 8, 2004
                  </span>
                ),
              },
              {
                icon: <RoomOutlinedIcon className={iconStyle} />,
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

          {/* Social Icons */}
          <motion.div
            className="flex justify-between items-center text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              target="__blank"
              href="https://www.instagram.com/anurag.singh_04"
            >
              <InstagramIcon />
            </a>
            <a
              target="__blank"
              href="https://www.linkedin.com/in/singhanurag2024/"
            >
              <LinkedInIcon />
            </a>
            <a target="__blank" href="https://github.com/Anurag-Singh-0">
              <GitHubIcon />
            </a>
            <a target="__blank" href="https://x.com/Anurag_singh_09">
              <XIcon />
            </a>
            <a
              target="__blank"
              href=" https://pixabay.com/users/only_realclicks-51200075/"
            >
              <CameraAltIcon />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;
