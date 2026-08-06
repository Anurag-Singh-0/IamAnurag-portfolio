import { useState } from "react";
import { easeInOut, motion } from "framer-motion";
import Popup from "../../src/components/common/Popup";

import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

function Contact() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const myAccessKey = import.meta.env.VITE_CONTACT_ACCESS_TOKEN;

  const onSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    formData.append("access_key", myAccessKey);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      setPopupMessage("Your message has been submitted successfully!");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      form.reset();
    } else {
      setPopupMessage("Something went wrong. Please try again.");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeInOut }}
      className="max-w-6xl mx-auto"
    >
      {/* Header with Subtitle */}
      <div className="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 relative inline-block after:block after:h-[5px] after:w-full after:bg-amber-300 after:rounded-full after:mt-1">
            Say <span className="text-amber-300">Hi!</span>
          </h1>
          <p className="text-white/50 text-md max-w-xl mt-4">
            Feel free to reach out for job openings, collaborations, or a friendly chat!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Connect With Me (Socials) */}
        <div className="lg:col-span-1 bg-[#222224] outline outline-white/20 rounded-3xl p-8 flex flex-col justify-between items-center sm:items-start">
          <div className="w-full text-center sm:text-left mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Connect</h2>
            <p className="text-white/50 text-sm">Find me on social platforms</p>
          </div>

          <div className="flex lg:flex-col justify-center sm:justify-start flex-wrap gap-4 sm:gap-6 w-full text-white/70">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/anurag.singh_04"
              className="flex items-center gap-3 bg-[#151515] outline outline-white/10 hover:outline-amber-300/50 hover:text-amber-300 p-3.5 rounded-2xl transition-all duration-300 w-full group"
            >
              <InstagramIcon className="text-xl text-amber-300" />
              <span className="text-sm font-medium text-white/80 group-hover:text-white">Instagram</span>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/singhanurag2024/"
              className="flex items-center gap-3 bg-[#151515] outline outline-white/10 hover:outline-amber-300/50 hover:text-amber-300 p-3.5 rounded-2xl transition-all duration-300 w-full group"
            >
              <LinkedInIcon className="text-xl text-amber-300" />
              <span className="text-sm font-medium text-white/80 group-hover:text-white">LinkedIn</span>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Anurag-Singh-0"
              className="flex items-center gap-3 bg-[#151515] outline outline-white/10 hover:outline-amber-300/50 hover:text-amber-300 p-3.5 rounded-2xl transition-all duration-300 w-full group"
            >
              <GitHubIcon className="text-xl text-amber-300" />
              <span className="text-sm font-medium text-white/80 group-hover:text-white">GitHub</span>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/Anurag_singh_09"
              className="flex items-center gap-3 bg-[#151515] outline outline-white/10 hover:outline-amber-300/50 hover:text-amber-300 p-3.5 rounded-2xl transition-all duration-300 w-full group"
            >
              <XIcon className="text-xl text-amber-300" />
              <span className="text-sm font-medium text-white/80 group-hover:text-white">Twitter (X)</span>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://pixabay.com/users/only_realclicks-51200075/"
              className="flex items-center gap-3 bg-[#151515] outline outline-white/10 hover:outline-amber-300/50 hover:text-amber-300 p-3.5 rounded-2xl transition-all duration-300 w-full group"
            >
              <CameraAltIcon className="text-xl text-amber-300" />
              <span className="text-sm font-medium text-white/80 group-hover:text-white">Pixabay</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-2 bg-[#222224] outline outline-white/20 rounded-3xl p-6 sm:p-10 flex flex-col justify-center">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/50">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="bg-[#151515] outline outline-white/10 focus:outline-amber-300/50 rounded-xl p-4 w-full text-white placeholder:text-white/20 transition-all text-sm"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/50">Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="bg-[#151515] outline outline-white/10 focus:outline-amber-300/50 rounded-xl p-4 w-full text-white placeholder:text-white/20 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/50">Your Message</label>
              <textarea
                name="message"
                placeholder="Write your message here..."
                required
                rows={5}
                className="bg-[#151515] outline outline-white/10 focus:outline-amber-300/50 rounded-xl p-4 w-full text-white placeholder:text-white/20 transition-all text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-amber-300 hover:bg-amber-400 text-black font-bold p-4 w-full rounded-xl transition-colors duration-200 cursor-pointer text-base tracking-wide shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Popup Message */}
      {showPopup && <Popup message={popupMessage} />}
    </motion.div>
  );
}

export default Contact;