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
      <div className="lg:mb-8 mb-7">
        <h1 className="lg:text-4xl text-3xl font-bold relative inline-block after:block after:h-[5px] after:w-full after:bg-amber-300 after:rounded-full after:mt-1">
          About Me
        </h1>
      </div>

      {/* Bio Section */}
      <div className="lg:min-h-[27vh] flex flex-col justify-between items-start mb-8">
        <p className="text-[15px] text-white/80 mb-5">
          Results-driven MERN Stack Developer with hands-on experience in
          designing and developing scalable, responsive, and user-centric web
          applications. Proficient in React.js, Node.js, Express.js, and MongoDB
          with strong knowledge of RESTful APIs, authentication, and deployment.
          Skilled at solving problems, writing clean and maintainable code, and
          collaborating within Agile teams, currently pursuing a BCA in Data
          Science & Artificial Intelligence (2023–2026) and seeking an
          opportunity to contribute to impactful software development projects.
        </p>
        <a
          href="/Anurag_Singh_MERN_Developer_Resume.pdf"
          download="Anurag_Singh_MERN_Developer_Resume.pdf"
          className="mt-4 bg-amber-300 text-black px-6 py-2 rounded-md hover:bg-amber-400 transition-colors shadow-xl/50 custom-resume-btn"
        >
          View Resume
        </a>
      </div>

      {/* Card Section */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-6">What I'm Doing,</h1>

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
      </div>

      {/* Education Section */}
      <div className="mt-12">
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
                  <h3 className="font-medium mb-3 lg:mb-2">{edu.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{edu.collage}</p>
                  <div className="flex flex-wrap gap-x-4 mt-1 text-sm text-gray-400">
                    <span>Period • {edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
