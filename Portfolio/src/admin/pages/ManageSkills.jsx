import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaUpload, FaSave, FaTimes, FaCode, FaLayerGroup, FaImage } from 'react-icons/fa';
import { 
  adminFetchSkills, 
  adminCreateSkill, 
  adminDeleteSkill, 
  uploadImage 
} from '../../services/api';

function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [sections, setSections] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [newSkill, setNewSkill] = useState({ name: '', icon: '', section: '' });
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await adminFetchSkills();
      const allSkills = response.data;
      
      // SORTING LOGIC: Sort skills oldest first
      allSkills.sort((a, b) => (a._id > b._id ? 1 : -1));
      
      const grouped = {};
      const categories = new Set(); // Set maintains strict insertion order

      allSkills.forEach(skill => {
        const section = skill.category || 'Uncategorized';
        categories.add(section); // Adds the category exactly when its oldest skill appears
        if (!grouped[section]) {
          grouped[section] = [];
        }
        grouped[section].push(skill);
      });

      // FIX: Use Array.from(categories) instead of Object.keys(grouped) to preserve order
      const sectionsArray = Array.from(categories).map(title => ({
        title,
        skills: grouped[title]
      }));

      setSections(sectionsArray);
      setAvailableCategories(Array.from(categories));
      setSkills(allSkills);
      
      if (categories.size === 0) {
        setIsCustomCategory(true);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      showMessage('error', 'Failed to fetch skills data');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'CREATE_NEW') {
      setIsCustomCategory(true);
      setNewSkill({ ...newSkill, section: '' });
    } else {
      setIsCustomCategory(false);
      setNewSkill({ ...newSkill, section: value });
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.name.trim()) return showMessage('error', 'Please enter a skill name');
    if (!newSkill.section.trim()) return showMessage('error', 'Please select or enter a category');
    if (!newSkill.icon) return showMessage('error', 'Please upload a skill icon');

    try {
      const skillData = {
        name: newSkill.name,
        icon: newSkill.icon,
        category: newSkill.section,
        proficiency: 50
      };

      const response = await adminCreateSkill(skillData);
      
      if (response.data.success) {
        await fetchSkills();
        setNewSkill({ name: '', icon: '', section: '' });
        setImagePreview(null);
        setIsCustomCategory(false);
        showMessage('success', 'Skill added successfully');
      } else {
        showMessage('error', response.data.message || 'Failed to add skill');
      }
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to add skill');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      await adminDeleteSkill(id);
      await fetchSkills();
      showMessage('success', 'Skill deleted successfully');
    } catch (error) {
      showMessage('error', 'Failed to delete skill');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);
    try {
      const response = await uploadImage(file);
      if (response.data.success) {
        setNewSkill({ ...newSkill, icon: response.data.url });
        setImagePreview(response.data.url);
        showMessage('success', 'Image uploaded successfully');
      } else {
        showMessage('error', 'Failed to upload image');
      }
    } catch (error) {
      showMessage('error', 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-300"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="bg-amber-300/10 text-amber-300 p-2.5 rounded-xl border border-amber-300/20">
              <FaCode className="text-2xl" />
            </span>
            Skill Repository
          </h1>
          <p className="text-white/50 mt-2 text-sm font-medium">Build and organize your technical expertise portfolio.</p>
        </div>
      </div>

      {/* Notifications */}
      {message && (
        <div className={`relative px-6 py-4 rounded-xl mb-8 flex justify-between items-center shadow-lg transition-all ${
          message.type === 'success' 
            ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
            : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          <span className="font-medium text-sm">{message.text}</span>
          <button 
            onClick={() => setMessage(null)}
            className="text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Modern Add Skill Form */}
      <div className="bg-[#151515] border border-white/5 rounded-2xl overflow-hidden mb-12 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300/20 via-amber-300/60 to-amber-300/20"></div>
        
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <FaPlus className="text-amber-300" /> Add New Technology
          </h2>
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Input Fields */}
            <div className="xl:col-span-8 flex flex-col gap-6">
              
              {/* Skill Name */}
              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
                  <FaCode className="text-amber-300/70" /> Technology Name
                </label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g., React.js, MongoDB, Docker"
                  className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-300/50 focus:ring-1 focus:ring-amber-300/50 transition-all placeholder:text-white/20 shadow-inner"
                />
              </div>

              {/* Category Dropdown/Input */}
              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
                  <FaLayerGroup className="text-amber-300/70" /> Organization Category
                </label>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    onChange={handleCategoryChange}
                    value={isCustomCategory ? 'CREATE_NEW' : newSkill.section}
                    className="w-full sm:w-1/2 bg-[#0d0d0d] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-300/50 focus:ring-1 focus:ring-amber-300/50 transition-all cursor-pointer appearance-none shadow-inner"
                    style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.2rem top 50%', backgroundSize: '0.65rem auto' }}
                  >
                    <option value="" disabled>Select a Category</option>
                    {availableCategories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                    <option value="CREATE_NEW" className="text-amber-300 font-bold">+ Create New Category</option>
                  </select>

                  {isCustomCategory && (
                    <input
                      type="text"
                      value={newSkill.section}
                      onChange={(e) => setNewSkill({ ...newSkill, section: e.target.value })}
                      placeholder="Enter new category name..."
                      className="w-full sm:w-1/2 bg-[#0d0d0d] border border-amber-300/30 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300 transition-all placeholder:text-white/20 shadow-inner animate-fade-in"
                      autoFocus
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="xl:col-span-4 flex flex-col gap-2.5">
              <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
                <FaImage className="text-amber-300/70" /> Technology Icon
              </label>
              
              <div className="h-full min-h-[140px] flex items-center gap-6 bg-[#0d0d0d] border border-white/10 rounded-xl p-4 shadow-inner">
                {/* Image Preview Box */}
                <div className="w-20 h-20 bg-[#151515] border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-lg relative group">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-12 h-12 object-contain drop-shadow-lg" />
                  ) : (
                    <FaCode className="text-white/10 text-3xl" />
                  )}
                </div>
                
                {/* Upload Button */}
                <label className="flex-1 cursor-pointer bg-[#151515] border-2 border-dashed border-white/10 hover:border-amber-300/50 hover:bg-amber-300/5 rounded-xl h-20 transition-all flex flex-col items-center justify-center gap-1.5 group">
                  <FaUpload className="text-white/30 group-hover:text-amber-300 transition-colors text-lg" />
                  <span className="text-xs font-medium text-white/40 group-hover:text-white/80 transition-colors">
                    {uploading ? 'Uploading...' : 'Browse Image'}
                  </span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 flex justify-end pt-6 border-t border-white/5">
            <button
              onClick={handleAddSkill}
              disabled={uploading}
              className={`cursor-pointer bg-amber-300 hover:bg-amber-400 text-black font-bold px-8 py-3.5 rounded-xl flex items-center gap-3 transition-all duration-200 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(252,211,77,0.2)] hover:shadow-[0_0_25px_rgba(252,211,77,0.4)] ${uploading ? 'opacity-50 cursor-not-allowed transform-none hover:shadow-none' : ''}`}
            >
              <FaSave className="text-lg" /> Save Technology
            </button>
          </div>
        </div>
      </div>

      {/* Skills Display Section */}
      <div className="space-y-10">
        {sections.length === 0 ? (
          <div className="bg-[#151515] border border-white/5 rounded-2xl p-20 text-center shadow-lg">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCode className="text-4xl text-white/20" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Technologies Found</h3>
            <p className="text-white/40 max-w-md mx-auto">Your skill repository is currently empty. Add your first technology using the professional form above.</p>
          </div>
        ) : (
          sections.map((section, index) => (
            <div key={index} className="bg-[#151515] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-8 bg-amber-300 rounded-full shadow-[0_0_10px_rgba(252,211,77,0.5)]"></div>
                  <h3 className="text-2xl font-bold text-white tracking-wide">{section.title}</h3>
                </div>
                <span className="bg-[#0d0d0d] border border-white/10 text-amber-300/80 text-xs font-bold px-4 py-2 rounded-full shadow-inner">
                  {section.skills.length} {section.skills.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              {/* Grid of Skills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                {section.skills.map((skill) => (
                  <div 
                    key={skill._id} 
                    className="group bg-[#0d0d0d] border border-white/5 hover:border-amber-300/40 rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 aspect-square shadow-lg hover:shadow-[0_0_20px_rgba(252,211,77,0.15)] hover:-translate-y-1"
                  >
                    {/* Glowing background effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-300/0 to-amber-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-14 h-14 object-contain mb-4 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md relative z-10"
                    />
                    <h4 className="text-white/80 group-hover:text-white text-sm font-semibold text-center w-full truncate relative z-10 transition-colors">
                      {skill.name}
                    </h4>
                    
                    {/* Hover Delete Overlay */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                      <button
                        onClick={() => handleDeleteSkill(skill._id)}
                        className="cursor-pointer bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white p-3.5 rounded-full transition-all duration-300 transform scale-50 group-hover:scale-100 shadow-xl"
                        title="Delete skill"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageSkills;