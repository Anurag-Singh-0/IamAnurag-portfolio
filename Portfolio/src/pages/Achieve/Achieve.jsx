import React from "react";
import { motion } from "framer-motion";

function Achieve() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="mb-8">
        <h1 className="lg:text-3xl text-2xl font-bold relative inline-block after:block after:h-[5px] after:w-full after:bg-amber-300 after:rounded-full after:mt-1">
          Achievements
        </h1>
      </div>
    </motion.div>
  );
}

export default Achieve;
