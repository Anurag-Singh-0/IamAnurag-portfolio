import React from "react";
import { motion } from "framer-motion";

function Skillbox({ name, img, alt }) {
  return (
    <motion.div
      whileHover="hover"
      whileTap="hover" // Triggers on mobile tap
      initial="initial"
      className="cursor-pointer bg-[#222224] h-24 w-24 sm:h-[110px] sm:w-[110px] rounded-2xl outline outline-white/20 hover:outline-amber-300/50 flex flex-col justify-center items-center p-3 relative overflow-hidden transition-colors duration-300"
    >
      {/* Animated Image */}
      <motion.img
        src={img}
        alt={alt}
        variants={{
          initial: { scale: 1, y: 0 },
          hover: { scale: 0.85, y: -10 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-12 w-12 sm:h-14 sm:w-14 z-10 object-contain"
      />

      {/* Animated Text */}
      <motion.h1
        variants={{
          initial: { opacity: 0, y: 15, scale: 0.9 },
          hover: { opacity: 1, y: 0, scale: 1 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute bottom-3 text-white text-[11px] sm:text-xs font-bold tracking-wide text-center w-full px-2 leading-tight"
      >
        {name}
      </motion.h1>
    </motion.div>
  );
}

export default Skillbox;