import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import GitHubIcon from "@mui/icons-material/GitHub";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function SocialHandle({ project, onMore }) {
  if (!project) return null;

  return (
    <div className="flex items-center gap-5">
      <a
        href={project.live}
        className="px-2 py-2 bg-[#212123] text-white/50 outline outline-white/20 rounded-lg hover:text-amber-400 relative overflow-hidden group transition-all duration-300"
        target="__blank"
      >
        <RemoveRedEyeIcon className="scale-80" />
        <span className="text-white absolute text-[9px] left-[12px] bottom-[-12px] group-hover:bottom-0 transition-all duration-200">
          Live
        </span>
      </a>

      <a
        href={project.repo}
        target="__blank"
        className="px-2 py-2 bg-[#212123] text-white/50 outline outline-white/20 rounded-lg hover:text-amber-400 duration-200 group relative overflow-hidden"
      >
        <GitHubIcon className="scale-80" />
        <span className="text-white absolute text-[9px] left-[8px] bottom-[-12px] group-hover:bottom-0 transition-all duration-200">
          Repo
        </span>
      </a>

      <a
        href={project.video}
        target="__blank"
        className="px-2 py-2 bg-[#212123] text-white/50 outline outline-white/20 rounded-lg hover:text-amber-400 duration-200 group relative overflow-hidden"
      >
        <VideoCameraBackIcon className="scale-80" />
        <span className="text-white absolute text-[9px] left-[8px] bottom-[-12px] group-hover:bottom-0 transition-all duration-200">
          Video
        </span>
      </a>

      {onMore && (
        <button
          onClick={onMore}
          className="px-2 py-2 bg-[#212123] text-white/50 outline outline-white/20 rounded-lg hover:text-amber-400 duration-200 group relative overflow-hidden"
        >
          <MoreHorizIcon className="scale-80" />
          <span className="text-white absolute text-[9px] left-[10px] bottom-[-12px] group-hover:bottom-0 transition-all duration-200">
            More
          </span>
        </button>
      )}
    </div>
  );
}

export default SocialHandle;
