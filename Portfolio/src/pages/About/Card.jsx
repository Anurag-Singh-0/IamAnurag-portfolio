function Card({ icon, title, desc }) {
    return (
      <div className="bg-[#222224] outline outline-white/20 rounded-xl w-full p-5 flex flex-col sm:flex-row sm:items-start sm:gap-5 text-center sm:text-left items-center gap-3 shadow-xl/30">
        {/* ICON */}
        <div className="text-amber-300 text-4xl scale-130">{icon}</div>
  
        {/* TEXT */}
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold text-white">{title}</h1>
          <p className="text-sm text-white/80">{desc}</p>
        </div>
      </div>
    );
  }
  
  export default Card;
  