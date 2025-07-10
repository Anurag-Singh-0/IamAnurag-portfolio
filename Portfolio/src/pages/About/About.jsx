import { motion } from "framer-motion";
import educationData from "../../data/education";

// Material icons
import Card from "./Card";
import LaptopIcon from "@mui/icons-material/Laptop";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import SchoolIcon from "@mui/icons-material/School";

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Title */}
      <div className="mb-3">
        <motion.h1
          className="text-4xl font-bold relative inline-block after:block after:h-[5px] after:w-full after:bg-amber-300 after:rounded-full after:mt-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          About Me
        </motion.h1>

        {/* Animated border that adjusts to content width */}
        <motion.div
          layout
          className="border-b-4 rounded-2xl mt-3 border-amber-300"
          style={{ width: "fit-content" }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Bio Section */}
      <motion.div
        className="lg:min-h-[27vh] flex flex-col justify-between items-start mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-[15px] text-white/80">
          Aspiring Full-Stack Developer skilled in HTML, CSS, JavaScript, React,
          Node.js, Express.js, MongoDB, and SQL. Passionate about web
          development and problem-solving. Currently pursuing a Bachelor of
          Computer Applications in Data Science and Artificial Intelligence at
          Babu Banarasi Das University, Lucknow. Seeking opportunities to apply
          and expand my skills in a professional setting.
        </p>
        <a
          href="/resume.pdf"
          download="Anurag_Singh_Resume.pdf"
          className="mt-4 bg-amber-300 text-black px-6 py-2 rounded-md hover:bg-amber-400 transition-colors shadow-xl/50"
        >
          View Resume
        </a>
      </motion.div>

      {/* Card Section */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-2xl font-bold mb-6">What I'm Doing, Right Now</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card
            icon={<LaptopIcon />}
            title="Web Development"
            desc="Building full-stack projects with HTML, CSS, JavaScript, React.js, Node.js, and MongoDB."
          />
          <Card
            icon={<EmojiObjectsIcon />}
            title="Data Structures and Algorithms"
            desc="I've recently started learning Data Structures and Algorithms to strengthen my problem-solving skills and build a strong foundation in programming."
          />
          <Card
            icon={<CameraEnhanceIcon />}
            title="Capturing the Moment"
            desc="I love clicking photos and capturing everyday moments in a creative way. Photography helps me see the beauty in little things and share my perspective with others"
          />
        </div>
      </motion.div>

      {/* Education Section */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-6">About My Studies</h1>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="bg-[#1e1e1fc4] p-6 rounded-lg shadow-xl/50 outline outline-white/30">
            <div className="flex items-center mb-4">
              <SchoolIcon
                className="text-amber-300 mr-3 scale-125"
                fontSize="medium"
              />
              <h2 className="text-xl font-semibold">Education</h2>
            </div>

            <div className="space-y-6">
              {educationData.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-medium mb-1">{edu.title}</h3>
                  <p className="text-sm text-gray-400">{edu.collage}</p>
                  <div className="flex flex-wrap gap-x-4 mt-1 text-sm text-gray-400">
                    <span>Period • {edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default About;
