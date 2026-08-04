import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminApp from './admin/AdminApp';
import About from './pages/About';
import Skill from './pages/Skill';
import Project from './pages/Project';
import ProjectDetails from './pages/ProjectDetails'; // NEW IMPORT
import Achieve from './pages/Achieve';
import Contact from './pages/Contact';
import Sidebar from './components/Sidebar';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <div className="bg-[#000]/95 min-h-screen w-full flex justify-center px-4 sm:px-15 py-8 relative custom-container">
              <div className="max-w-[1800px] w-full flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-[300px] h-auto lg:h-screen lg:sticky lg:top-8 flex-shrink-0">
                  <Sidebar />
                </div>
                <div className="bg-[#1e1e1fd4] w-full min-h-[100vh] rounded-xl outline outline-white/30 p-6 sm:p-8 text-white pb-16 mb-20 lg:pb-10 overflow-hidden custom-hero relative flex-1">
                  <Navbar />
                  <div className="lg:pt-0">
                    <Routes>
                      <Route path="/" element={<Navigate to="/about" replace />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/skill" element={<Skill />} />
                      <Route path="/project" element={<Project />} />
                      <Route path="/project/:id" element={<ProjectDetails />} /> {/* NEW ROUTE */}
                      <Route path="/achieve" element={<Achieve />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;