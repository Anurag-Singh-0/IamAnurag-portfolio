import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, FaCode, FaProjectDiagram, FaTrophy, 
  FaBoxOpen, FaArrowRight, FaClock, FaPlusCircle, FaEdit
} from 'react-icons/fa';
import { adminFetchAbout, adminFetchSkills, adminFetchProjects, adminFetchAchievements } from '../../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState({
    aboutSet: false,
    aboutName: '',
    skillsCount: 0,
    topSkills: [],
    projectsCount: 0,
    productsCount: 0,
    achievementsCount: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set dynamic greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [aboutRes, skillsRes, projectsRes, achievementsRes] = await Promise.all([
        adminFetchAbout(),
        adminFetchSkills(),
        adminFetchProjects(),
        adminFetchAchievements(),
      ]);

      // Calculate Products vs Projects
      const projectsData = projectsRes.data || [];
      const products = projectsData.filter(p => p.type === 'product').length;
      const regularProjects = projectsData.filter(p => p.type !== 'product').length;

      setStats({
        aboutSet: !!aboutRes.data?.bio,
        aboutName: aboutRes.data?.name || 'Admin',
        skillsCount: skillsRes.data?.length || 0,
        topSkills: skillsRes.data?.slice(0, 5) || [], // Grab first 5 skills for preview
        projectsCount: regularProjects,
        productsCount: products,
        achievementsCount: achievementsRes.data?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-300"></div>
      </div>
    );
  }

  // Analytics Cards Data
  const cards = [
    { 
      label: 'Live Products', 
      value: stats.productsCount, 
      icon: <FaBoxOpen />, 
      color: 'text-amber-300 bg-amber-300/10 border-amber-300/20',
      link: '/admin/projects' 
    },
    { 
      label: 'Case Studies', 
      value: stats.projectsCount, 
      icon: <FaProjectDiagram />, 
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      link: '/admin/projects' 
    },
    { 
      label: 'Tech Skills', 
      value: stats.skillsCount, 
      icon: <FaCode />, 
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      link: '/admin/skills' 
    },
    { 
      label: 'Achievements', 
      value: stats.achievementsCount, 
      icon: <FaTrophy />, 
      color: 'text-green-400 bg-green-500/10 border-green-500/20',
      link: '/admin/achievements' 
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 pb-20"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pt-6">
        <div>
          <div className="flex items-center gap-2 text-amber-300/80 mb-2 font-medium">
            <FaClock className="text-sm" /> 
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {greeting}, <span className="text-amber-300">{stats.aboutName.split(' ')[0] || 'Fury'}</span> 👋
          </h1>
          <p className="text-white/50 mt-2 text-lg">Here is the current status of your portfolio command center.</p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="bg-[#151515] border border-white/5 rounded-3xl p-6 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_10px_30px_-15px_rgba(255,255,255,0.1)] group block relative overflow-hidden"
          >
            {/* Soft background glow on hover */}
            <div className={`absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${card.color.split(' ')[1]}`}></div>
            
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className={`p-4 rounded-2xl border ${card.color}`}>
                <span className="text-2xl">{card.icon}</span>
              </div>
              <FaArrowRight className="text-white/20 group-hover:text-white/60 transition-colors" />
            </div>
            
            <div className="relative z-10">
              <p className="text-4xl font-black text-white tracking-tight">{card.value}</p>
              <p className="text-white/50 text-sm font-semibold tracking-wide uppercase mt-1">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Section: Quick Actions & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions Panel */}
        <div className="lg:col-span-2 bg-[#151515] border border-white/5 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/admin/projects" className="bg-[#1a1a1a] hover:bg-[#222] border border-white/10 p-5 rounded-2xl flex items-center gap-4 transition-colors group">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-amber-300/10 group-hover:text-amber-300 transition-colors"><FaPlusCircle /></div>
              <div>
                <h3 className="font-bold text-white">Add New Project</h3>
                <p className="text-xs text-white/50 mt-1">Publish a case study or product.</p>
              </div>
            </Link>
            <Link to="/admin/about" className="bg-[#1a1a1a] hover:bg-[#222] border border-white/10 p-5 rounded-2xl flex items-center gap-4 transition-colors group">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-blue-400/10 group-hover:text-blue-400 transition-colors"><FaEdit /></div>
              <div>
                <h3 className="font-bold text-white">Update Profile</h3>
                <p className="text-xs text-white/50 mt-1">Modify bio, resume, or experience.</p>
              </div>
            </Link>
            <Link to="/admin/achievements" className="bg-[#1a1a1a] hover:bg-[#222] border border-white/10 p-5 rounded-2xl flex items-center gap-4 transition-colors group">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-green-400/10 group-hover:text-green-400 transition-colors"><FaPlusCircle /></div>
              <div>
                <h3 className="font-bold text-white">Add Milestone</h3>
                <p className="text-xs text-white/50 mt-1">Record a new certification or award.</p>
              </div>
            </Link>
            <Link to="/admin/skills" className="bg-[#1a1a1a] hover:bg-[#222] border border-white/10 p-5 rounded-2xl flex items-center gap-4 transition-colors group">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-purple-400/10 group-hover:text-purple-400 transition-colors"><FaPlusCircle /></div>
              <div>
                <h3 className="font-bold text-white">Update Tech Stack</h3>
                <p className="text-xs text-white/50 mt-1">Add new languages or tools.</p>
              </div>
            </Link>
          </div>
        </div>

        {/* System Status / Profile Snapshot */}
        <div className="bg-[#151515] border border-white/5 rounded-3xl p-8 shadow-xl flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6">Profile Health</h2>
          
          <div className="flex-1 flex flex-col gap-6 justify-center">
            {/* About Check */}
            <div className="flex items-center justify-between bg-[#1a1a1a] border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <FaUser className="text-white/40" />
                <span className="text-white/80 font-medium text-sm">About Section</span>
              </div>
              {stats.aboutSet ? (
                <span className="bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-lg">Configured</span>
              ) : (
                <span className="bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1 rounded-lg">Action Required</span>
              )}
            </div>

            {/* Top Skills Preview */}
            <div className="bg-[#1a1a1a] border border-white/5 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/80 font-medium text-sm flex items-center gap-2"><FaCode className="text-white/40"/> Top Skills</span>
                <Link to="/admin/skills" className="text-amber-300 text-xs hover:underline">View All</Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {stats.topSkills.length > 0 ? (
                  stats.topSkills.map((skill, idx) => (
                    <span key={idx} className="bg-white/5 border border-white/10 text-white/60 text-xs px-2.5 py-1 rounded-md">
                      {skill.name}
                    </span>
                  ))
                ) : (
                  <span className="text-white/30 text-xs">No skills added yet.</span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default AdminDashboard;