import Sidebar from "./Sidebar";
import Hero from "./Hero";

function Container() {
  return (
    <div className="bg-[#000]/95 min-h-screen w-full flex justify-center px-4 sm:px-15 py-8 relative custom-container">
      <div className="max-w-[1800px] w-full flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-[300px] h-auto lg:h-screen lg:sticky lg:top-8 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Hero Section */}
        <div className="flex-1">
          <Hero />
        </div>
      </div>
    </div>
  );
}

export default Container;
