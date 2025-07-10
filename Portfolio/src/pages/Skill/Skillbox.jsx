import React from "react";


function Skillbox({ name, img, alt }) {
  return (
    <div className="group bg-[#232325] h-25 w-25 rounded-lg outline outline-white/20 shadow-xl/30 flex flex-col justify-center items-center p-2 relative overflow-hidden">
      {/* Animated Image */}
      <img
        src={img}
        alt={alt}
        className="h-15 w-15 mb-2 z-10 transition-all duration-300 ease-in-out group-hover:scale-90 group-hover:-translate-y-2"
      />

      {/* Animated Text */}
      <h1 className="absolute bottom-[-30%] text-white text-sm font-semibold transition-all duration-300 ease-in-out group-hover:bottom-3">
        {name}
      </h1>
    </div>
  );
}

export default Skillbox;
