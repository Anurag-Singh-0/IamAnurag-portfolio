import { easeInOut, motion } from "framer-motion";

function Popup({ message }) {
  return (
    <motion.div
      className="h-full w-full fixed top-0 right-0 p-2 backdrop-blur-sm flex justify-center items-center flex-wrap duration-200 lg:text-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: easeInOut }}
    >
      <div className="outline outline-white/30 p-8 rounded-xl text-green-500 font-bold shadow-xl/90 flex flex-col justify-center items-center gap-3">
        {message}
        <span className="text-[11px] text-white/50">
          This message will be removed after 3 seconds
        </span>
      </div>
    </motion.div>
  );
}

export default Popup;
