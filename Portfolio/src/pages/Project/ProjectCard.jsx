import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SocialHandle from "./SocialHandle";

function ProjectCard({ img, title, desc, alt, onMore, live, repo, video }) {
  const project = { live, repo, video };

  return (
    <div className="bg-[#222224] outline outline-white/20 rounded-xl p-4 w-full shadow-xl">
      {/* Project Image */}
      <div className="lg:h-60 w-full overflow-hidden flex justify-center items-center rounded-xl group mb-1">
        <img
          src={img}
          alt={alt}
          className="group-hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </div>

      {/* Title & Description*/}
      <div>
        <h1 className="lg:text-3xl text-[5vw] font-extrabold mb-2">{title}</h1>
        <p className="line-clamp-2 text-sm text-white/70">{desc}</p>
      </div>

      {/* Project View action btns */}
      <div className="flex items-center gap-5 mt-4">
        {/* Pass project object to SocialHandle */}
        <SocialHandle project={project} onMore={onMore}/>
      </div>
    </div>
  );
}

export default ProjectCard;
