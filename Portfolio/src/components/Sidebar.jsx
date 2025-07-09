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

const iconStyle = "text-amber-300 text-[28px]";

const Sidebar = () => {
  return (
    <div className="bg-[#1e1e1f9d] w-full lg:w-[300px] rounded-xl outline outline-white/30 text-[#FAFAFA] h-auto lg:h-full overflow-hidden">
      <div className="h-auto lg:h-full overflow-visible lg:overflow-y-auto px-10 py-10 hide-scrollbar">
        <div className="flex flex-col items-center gap-2 mb-8">
          <img
            src="/Favicon.jpg"
            alt="Avatar"
            className="rounded-lg mb-4 w-32 h-32 object-cover object-center"
          />
          <h1 className="font-bold uppercase text-2xl mb-3">Anurag Singh</h1>
          <p className="bg-[#2B2B2C] px-3 py-1 text-xs rounded-md shadow-2xl">
            Full Stack Developer
          </p>
        </div>

        <hr className="w-full border-white/20 mb-6" />

        <div className="flex flex-col gap-8 mb-7">
          <div className="flex gap-3 items-center">
            <span className="bg-[#2B2B2C] p-3 rounded-xl shadow-md hover:scale-105 transition-all duration-200">
              <MarkunreadOutlinedIcon className={iconStyle} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400 uppercase">Email</span>
              <a
                href="mailto:singh.anurag2026@gmail.com"
                className="text-[13px] text-white/90 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]"
              >
                singh.anurag2026@gmail.com
              </a>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <span className="bg-[#2B2B2C] p-3 rounded-xl shadow-md hover:scale-105 transition-all duration-200">
              <SmartphoneOutlinedIcon className={iconStyle} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400 uppercase">Phone</span>
              <a
                href="tel:7678936521"
                className="text-[13px] text-white/90 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]"
              >
                +91 7********1
              </a>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <span className="bg-[#2B2B2C] p-3 rounded-xl shadow-md hover:scale-105 transition-all duration-200">
              <CalendarMonthOutlinedIcon className={iconStyle} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Birthday</span>
              <span className="text-[13px] text-white/90 uppercase">
                Feb 8, 2004
              </span>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <span className="bg-[#2B2B2C] p-3 rounded-xl shadow-md hover:scale-105 transition-all duration-200">
              <RoomOutlinedIcon className={iconStyle} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400 uppercase">Location</span>
              <span className="text-[13px] text-white/90">
                Lucknow, Uttar Pradesh, India
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-white/70">
          <a href="" className="hover:text-amber-300 duration-300">
            <InstagramIcon />
          </a>
          <a href="" className="hover:text-amber-300 duration-300">
            <LinkedInIcon />
          </a>
          <a href="" className="hover:text-amber-300 duration-300">
            <XIcon />
          </a>
          <a href="" className="hover:text-amber-300 duration-300">
            <GitHubIcon />
          </a>
          <a href="" className="hover:text-amber-300 duration-300">
            <CameraAltIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
