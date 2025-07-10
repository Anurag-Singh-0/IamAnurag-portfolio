import { motion } from "framer-motion";

import Skillbox from "./Skillbox";
import images from "../../Images";

const skills = [
  { name: "Frontend Development", level: "80%" },
  { name: "Backend Development", level: "40%" },
  { name: "Core Subjects - OS, CN", level: "10%" },
  { name: "Problem Solving / DSA", level: "5%" },
];

function Skill() {
  return (
    <motion.div
      className="text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold relative inline-block after:block after:h-[5px] after:w-full after:bg-amber-300 after:rounded-full after:mt-1">
          Skills
        </h1>
      </div>

      <div className="lg:p-5 mb-5">
        {/* Levels */}
        <div className="flex justify-between text-sm text-white/70 px-2 mb-4 lg:max-w-full lg:pl-25">
          <span>Basic</span>
          <span>Good</span>
          <span>Skilled</span>
          <span>Master</span>
        </div>

        {/* Skill Progress Container */}
        <div className="bg-[#1f1f1f] p-6 rounded-xl max-w-full outline outline-white/20 shadow-xl/30">
          {skills.map((skill, index) => (
            <div key={index} className="mb-6">
              <div className="mb-2 font-medium">{skill.name}</div>
              <div className="w-full h-2 bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-amber-400 rounded-full transition-all duration-700"
                  style={{ width: skill.level }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frontend Section */}
      <div className="mt-10">
        {/* Title */}
        <h1 className="text-3xl font-extrabold uppercase mb-10 text-center">
          Frontend
        </h1>
        <div className="flex justify-center flex-wrap gap-8 items-center">
          <Skillbox name={"HTML"} alt={"HTML"} img={images.html} />
          <Skillbox name={"CSS"} alt={"CSS"} img={images.css} />

          <Skillbox name={"React"} alt={"React"} img={images.react} />
          <Skillbox name={"GSAP"} alt={"GSAP"} img={images.gsap} />
          <Skillbox name={"Material-UI"} alt={"M-UI"} img={images.materialUi} />
          <Skillbox name={"Tailwind"} alt={"tailwind"} img={images.tailwind} />
          <Skillbox
            name={"Bootstrap"}
            alt={"bootstrap"}
            img={images.bootstap}
          />
        </div>
      </div>

      {/* Backend Section */}
      <div className="mt-15">
        {/* Title */}
        <h1 className="text-3xl font-extrabold uppercase mb-10 text-center">
          Backend
        </h1>
        <div className="flex justify-center flex-wrap gap-8 items-center">
          <Skillbox name={"JavaScript"} alt={"JavaScript"} img={images.js} />
          <Skillbox name={"Nodejs"} alt={"Nodejs"} img={images.nodejs} />
          <Skillbox name={"Expresjs"} alt={"exjs"} img={images.expressjs} />
          <Skillbox name={"MongoDB"} alt={"Mdb"} img={images.mongodb} />
          <Skillbox name={"SQL"} alt={"SQL"} img={images.sql} />
        </div>
      </div>

      {/* Others */}
      <div className="mt-15">
        {/* Title */}
        <h1 className="text-3xl font-extrabold uppercase mb-10 text-center">
          Others
        </h1>
        <div className="flex justify-center flex-wrap gap-8 items-center">
          <Skillbox name={"GitHub"} alt={"GitHub"} img={images.github} />
          <Skillbox name={"VS Code"} alt={"VS Code"} img={images.vscode} />
          <Skillbox name={"Vercel"} alt={"vercel"} img={images.vercel} />
        </div>
      </div>
    </motion.div>
  );
}

export default Skill;
