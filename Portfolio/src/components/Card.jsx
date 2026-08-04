import React from 'react';

function Card({ icon, title, desc }) {
    return (
      <div className="bg-[#222224] outline outline-white/20 hover:outline-amber-300/50 rounded-3xl w-full p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start sm:gap-6 text-center sm:text-left items-center gap-4 transition-all duration-300 h-full">
        {/* ICON */}
        <div className="p-4 bg-[#151515] rounded-2xl outline outline-white/10 flex-shrink-0 flex items-center justify-center">
          {icon}
        </div>
  
        {/* TEXT */}
        <div className="flex flex-col gap-2 justify-center flex-1">
          <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
          <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
        </div>
      </div>
    );
}

export default Card;