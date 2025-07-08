import Sidebar from "./Sidebar";
import Hero from "./Hero";

function Container() {
  return (
    <div className="bg-[#000]/95 w-full min-h-screen flex flex-col lg:flex-row justify-evenly items-start px-4 py-8">
      <Sidebar />
      <Hero />
    </div>
  );
}

export default Container;
