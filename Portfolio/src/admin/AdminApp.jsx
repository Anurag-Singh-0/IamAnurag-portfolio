import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageAbout from './pages/ManageAbout';
import ManageSkills from './pages/ManageSkills';
import ManageProjects from './pages/ManageProjects';
import ManageAchievements from './pages/ManageAchievements';
import ProtectedRoute from './components/ProtectedRoute';
import AdminNavbar from './components/AdminNavbar';

function AdminApp() {
  return (
    <div className="flex flex-col h-screen w-full bg-[#0d0d0d] text-white overflow-hidden">
      <Routes>
        <Route path="/login" element={<AdminLogin />} />

        {/* All protected routes container */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col h-screen w-full relative">
              
              {/* Single Top Navbar for Navigation */}
              <AdminNavbar />
              
              {/* Main Content Area */}
              <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#111]">
                <Routes>
                  <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/about" element={<ProtectedRoute><ManageAbout /></ProtectedRoute>} />
                  <Route path="/skills" element={<ProtectedRoute><ManageSkills /></ProtectedRoute>} />
                  <Route path="/projects" element={<ProtectedRoute><ManageProjects /></ProtectedRoute>} />
                  <Route path="/achievements" element={<ProtectedRoute><ManageAchievements /></ProtectedRoute>} />
                </Routes>
              </main>

            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default AdminApp;