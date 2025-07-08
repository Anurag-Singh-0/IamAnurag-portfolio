import { images } from "../Images";

import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

const iconStyle = "text-amber-300 text-[28px]";

const Sidebar = () => {
  return (
    <div className="bg-[#1E1E1F] max-w-xs w-full h-full min-h-145 rounded-xl outline outline-white/30 text-[#FAFAFA]">
        <div className="h-full overflow-y-auto px-10 py-6 hide-scrollbar">
        <div className="flex flex-col items-center gap-2 mb-5">
          <img
            src={images.AnuragImg}
            alt="Avatar"
            className="rounded-lg mb-2 w-40 h-35 object-cover object-center"
          />
          <h1 className="font-bold uppercase text-2xl">Anurag Singh</h1>
          <p className="bg-[#2B2B2C] px-3 py-1 text-xs rounded-md">
            Full Stack Developer
          </p>
        </div>

        {/* Horizontal Line */}
        <hr className="w-full border-white/20 mb-6" />

        {/* ICON STACK */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 items-center justify-between">
            <span className="bg-[#2B2B2C] p-3 rounded-xl shadow-md hover:scale-105 transition-all duration-200">
              <MarkunreadOutlinedIcon className={iconStyle} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Email</span>
              <a
                href="mailto:singh.anurag2026@gmail.com"
                className="text-[13px] text-white/90 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]"
              >
                singh.anurag2026@gmail.com
              </a>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <span className="bg-[#2B2B2C] p-3 rounded-xl shadow-md hover:scale-105 transition-all duration-200">
              <SmartphoneOutlinedIcon className={iconStyle} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Phone</span>
              <a
                href="tel:7678936521"
                className="text-[13px] text-white/90 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]"
              >
                +91 7********1
              </a>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <span className="bg-[#2B2B2C] p-3 rounded-xl shadow-md hover:scale-105 transition-all duration-200">
              <CalendarMonthOutlinedIcon className={iconStyle} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Birthday</span>
              <span className="text-[13px] text-white/90">Feb 8, 2004</span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <span className="bg-[#2B2B2C] p-3 rounded-xl shadow-md hover:scale-105 transition-all duration-200">
              <RoomOutlinedIcon className={iconStyle} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Location</span>
              <span className="text-[13px] text-white/90">
                Lucknow, Uttar Pradesh, India
              </span>
            </div>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
          corporis sequi sapiente ab officiis optio quaerat neque iusto mollitia
          tempora cum praesentium eum officia recusandae veritatis eius ratione,
          aliquam dolor?
        </p>

        <div></div>
      </div>
    </div>
  );
};

export default Sidebar;
