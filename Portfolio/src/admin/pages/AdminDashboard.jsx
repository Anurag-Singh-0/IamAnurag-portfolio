import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCode, FaProjectDiagram, FaTrophy, FaComments } from 'react-icons/fa';
import { adminFetchAbout, adminFetchSkills, adminFetchProjects, adminFetchAchievements } from '../../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState({
    about: false,
    skills: 0,
    projects: 0,
    achievements: 0,
    pendingComments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [aboutRes, skillsRes, projectsRes, achievementsRes, commentsRes] = await Promise.all([
        adminFetchAbout(),
        adminFetchSkills(),
        adminFetchProjects(),
        adminFetchAchievements(),
      ]);

      setStats({
        about: !!aboutRes.data,
        skills: skillsRes.data.length,
        projects: projectsRes.data.length,
        achievements: achievementsRes.data.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { 
      label: 'About', 
      value: stats.about ? 'Configured' : 'Not Set', 
      icon: <FaUser />, 
      color: 'bg-blue-500/20 text-blue-400', 
      link: '/admin/about' 
    },
    { 
      label: 'Skills', 
      value: stats.skills, 
      icon: <FaCode />, 
      color: 'bg-purple-500/20 text-purple-400', 
      link: '/admin/skills' 
    },
    { 
      label: 'Projects', 
      value: stats.projects, 
      icon: <FaProjectDiagram />, 
      color: 'bg-green-500/20 text-green-400', 
      link: '/admin/projects' 
    },
    { 
      label: 'Achievements', 
      value: stats.achievements, 
      icon: <FaTrophy />, 
      color: 'bg-orange-500/20 text-orange-400', 
      link: '/admin/achievements' 
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {loading ? (
        <div className="text-white/60">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 hover:border-amber-300/50 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-medium">{card.label}</p>
                  <p className="text-2xl font-bold mt-2">{card.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${card.color}`}>
                  <span className="text-xl">{card.icon}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;