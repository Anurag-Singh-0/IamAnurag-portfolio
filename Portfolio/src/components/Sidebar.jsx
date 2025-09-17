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
    <div className="bg-[#1e1e1f9d] w-full rounded-xl outline outline-white/30 text-[#FAFAFA] h-auto relative">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden  mb-4 inline-block absolute right-0">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="outline outline-white/30 px-2 py-2 shadow transition duration-200 rounded-bl-xl rounded-tr-xl"
        >
          {showDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </button>
      </div>

      <div className="overflow-y-auto px-6 sm:px-10 py-10 hide-scrollbar">
        {/* Profile section */}
        <motion.div
          className="relative mb-3 lg:mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex lg:flex-col lg:justify-center items-center flex-row gap-5">
            <div className="flex-shrink-0">
              <img
                src={images.model3}
                alt="Avatar"
                className="rounded-full mb-4 lg:mb-0 w-25 h-25 md:w-34 md:h-34 lg:w-34 lg:h-34 object-cover object-center border-4 border-white/20 shadow-lg"
              />
            </div>
            <div className="text-center lg:text-left">
              <h1 className="font-bold text-2xl sm:text-2xl mb-3">
                Anurag Singh
              </h1>
              <p className="bg-[#2B2B2C] px-4 py-1.5 text-[0.8rem] rounded-full shadow-lg text-gray-300 font-medium inline-block">
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
              className="hover:text-amber-300 duration-200"
            >
              <InstagramIcon />
            </a>
            <a
              target="__blank"
              href="https://www.linkedin.com/in/singhanurag2024/"
              className="hover:text-amber-300 duration-200"
            >
              <LinkedInIcon />
            </a>
            <a
              target="__blank"
              href="https://github.com/Anurag-Singh-0"
              className="hover:text-amber-300 duration-200"
            >
              <GitHubIcon />
            </a>
            <a
              target="__blank"
              href="https://x.com/Anurag_singh_09"
              className="hover:text-amber-300 duration-200"
            >
              <XIcon />
            </a>
            <a
              target="__blank"
              href=" https://pixabay.com/users/only_realclicks-51200075/"
              className="hover:text-amber-300 duration-200"
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
