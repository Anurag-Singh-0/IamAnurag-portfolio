import CircularProgress from "@mui/material/CircularProgress";

function ComingSoon({ image, title, desc }) {
  return (
    <div className="bg-[#222224] outline outline-gray-600 rounded-2xl overflow-hidden p-4 flex flex-col gap-4 w-full mx-auto">
      <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden rounded-2xl">
        {/* Blurred project image */}
        <img
          src={image}
          alt="Coming soon project preview"
          className="w-full h-full object-cover blur-sm opacity-70"
        />

        {/* Overlay with animation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
          <CircularProgress size={50} thickness={5} color="inherit" />
          <p className="text-white mt-4 text-lg font-semibold animate-pulse">
            Coming Soon
          </p>
        </div>
      </div>

      {/* Optional description section */}
      <div className="">
        <h1 className="font-semibold text-lg text-white mb-1">{title}</h1>
        <p className="text-gray-400 text-sm line-clamp-2">{desc}</p>
      </div>
    </div>
  );
}

export default ComingSoon;
