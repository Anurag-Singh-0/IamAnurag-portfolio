import educationData from "../../data/education";

// Material icons
import Card from "./Card";
import LaptopIcon from "@mui/icons-material/Laptop";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import SchoolIcon from "@mui/icons-material/School";

function About() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">About Me</h1>
        <div className="border-b-5 w-[20%] rounded-2xl mt-3 border-amber-300"></div>
      </div>

      {/* About Bio Section */}
      <div className="lg:min-h-[27vh] flex flex-col justify-between items-start mb-8">
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
      </div>

      {/* Card Section */}
      <div className="mb-10">
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
      </div>

      {/* Education & Experience Section */}
      <div className="mt-12">
        <h1 className="text-2xl font-bold mb-6">About My Studies</h1>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Education */}
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
      </div>
    </div>
  );
}

export default About;
