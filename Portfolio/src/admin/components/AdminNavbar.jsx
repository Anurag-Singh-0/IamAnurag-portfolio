import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

function AdminNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/about', label: 'About' },
    { path: '/admin/skills', label: 'Skills' },
    { path: '/admin/projects', label: 'Projects' },
    { path: '/admin/achievements', label: 'Achievements' },
  ];

  return (
    <header className="bg-[#1a1a1a] border-b border-white/5 relative z-50">
      {/* Main Header Bar */}
      <div className="px-4 sm:px-6 h-[73px] flex items-center justify-between">
        
        {/* Left Side: Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-300 rounded-lg flex items-center justify-center shadow-lg shadow-amber-300/20">
            <span className="text-black font-bold text-xl">F</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide hidden sm:block">
            Fury<span className="text-amber-300">Admin</span>
          </h1>
        </div>

        {/* Middle: Desktop Navigation Links (Icons removed for a cleaner look) */}
        <div className="hidden lg:flex items-center gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                cursor-pointer px-4 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide
                ${isActive 
                  ? 'bg-amber-300/10 text-amber-300' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Side: User Profile & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-white">Anurag Singh</span>
            <span className="text-xs text-white/50">Administrator</span>
          </div>
          
          <div className="cursor-pointer w-10 h-10 rounded-full bg-amber-300/10 border border-amber-300/30 flex items-center justify-center text-amber-300 font-bold text-lg overflow-hidden hover:bg-amber-300/20 transition-colors">
            A
          </div>

          {/* Desktop Logout Button */}
          <button
            onClick={handleLogout}
            className="cursor-pointer hidden lg:flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2.5 rounded-lg transition-colors font-medium text-sm"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="cursor-pointer lg:hidden text-white/50 hover:text-amber-300 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[73px] left-0 w-full bg-[#151515] border-b border-white/5 shadow-2xl py-4 px-4 flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `
                cursor-pointer px-4 py-3 rounded-xl transition-all duration-200 font-medium tracking-wide
                ${isActive 
                  ? 'bg-amber-300/10 text-amber-300' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              {item.label}
            </NavLink>
          ))}
          
          <div className="h-px bg-white/5 my-2"></div>
          
          <button
            onClick={handleLogout}
            className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 font-medium w-full text-left"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </header>
  );
}

export default AdminNavbar;