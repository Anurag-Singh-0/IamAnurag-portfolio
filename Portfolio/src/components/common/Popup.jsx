import { easeInOut, motion } from "framer-motion";

function Popup({ message }) {
  return (
    <motion.div
      className="h-full w-full fixed inset-0 z-50 p-4 bg-black/40 backdrop-blur-sm flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: easeInOut }}
    >
      <div className="bg-[#222224] outline outline-white/20 p-8 rounded-3xl text-white font-semibold text-center flex flex-col justify-center items-center gap-3 max-w-sm w-full shadow-2xl">
        <p className="text-amber-300 text-lg font-bold">{message}</p>
        <span className="text-xs text-white/40">
          This message will close automatically
        </span>
      </div>
    </motion.div>
  );
}

export default Popup;