import images from "../Images";
import CircularProgress from "@mui/material/CircularProgress";

function ComingSoon() {
  return (
    <div className="">
      <div className="bg-[#222224] outline outline-gray-600 w-100 rounded-2xl overflow-hidden p-5 flex flex-col gap-3">
        <img src={images.model} className="w-full blur-lg rounded-2xl relative" />
        <CircularProgress className="absolute left-50 bottom-80"/>
        <div>
          <h1 className="font-semibold text-xl mb-3">FuryLand - E-commerce</h1>
          <p className="text-sm text-gray-400 line-clamp-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            nostrum vero sequi a, placeat repellat necessitatibus asperiores.
            Dolorem veritatis distinctio, autem.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
