import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaUpload, FaTimes } from 'react-icons/fa';
import {
  adminFetchAchievements,
  adminCreateAchievement,
  adminUpdateAchievement,
  adminDeleteAchievement,
  uploadImage,
} from '../../services/api';

function ManageAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    date: '',
    certificateLink: '',
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await adminFetchAchievements();
      setAchievements(response.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    setUploading(true);
    try {
      const newImageUrls = [];
      for (const file of files) {
        const response = await uploadImage(file);
        newImageUrls.push(response.data.url);
      }
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...newImageUrls] }));
      setMessage({ type: 'success', text: 'Images uploaded successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload images' });
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      if (editingId) {
        await adminUpdateAchievement(editingId, formData);
        setMessage({ type: 'success', text: 'Achievement updated successfully' });
      } else {
        await adminCreateAchievement(formData);
        setMessage({ type: 'success', text: 'Achievement added successfully' });
      }
      setFormData({ title: '', description: '', images: [], date: '', certificateLink: '' });
      setEditingId(null);
      fetchAchievements();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save achievement' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEdit = (achievement) => {
    setFormData({
      title: achievement.title || '',
      description: achievement.description || '',
      // Backward compatibility for old single image setup
      images: achievement.images?.length ? achievement.images : (achievement.image ? [achievement.image] : []),
      date: achievement.date || '',
      certificateLink: achievement.certificateLink || '',
    });
    setEditingId(achievement._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) return;
    try {
      await adminDeleteAchievement(id);
      fetchAchievements();
      setMessage({ type: 'success', text: 'Achievement deleted successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete achievement' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) return <div className="text-white/60 p-10 flex justify-center items-center h-full text-lg font-medium tracking-wide">Loading records...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Manage <span className="text-amber-300">Achievements</span></h1>
      </div>

      {message && (
        <div className={`px-5 py-4 rounded-xl mb-8 font-semibold tracking-wide flex items-center shadow-lg ${message.type === 'success' ? 'bg-[#222224] border border-green-500/50 text-green-400' : 'bg-[#222224] border border-red-500/50 text-red-400'}`}>
          {message.text}
        </div>
      )}

      {/* Editor Form */}
      <div className="bg-[#222224] border border-white/20 rounded-3xl p-8 mb-12 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-white/90">{editingId ? 'Edit Achievement Details' : 'Add New Achievement'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-300/50 transition-colors" placeholder="e.g. Hackathon Winner 2024" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-300/50 transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" required className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-300/50 resize-none transition-colors" placeholder="Briefly describe your achievement..." />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Certificate URL (Optional)</label>
            <input type="url" name="certificateLink" value={formData.certificateLink} onChange={handleInputChange} placeholder="https://..." className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-300/50 transition-colors" />
          </div>

          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Achievement Images</label>
            
            {/* Image Preview Grid */}
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-xl border border-white/20" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <FaTimes className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="cursor-pointer bg-[#151515] border-2 border-dashed border-white/20 hover:border-amber-300/50 transition-colors rounded-2xl p-6 flex flex-col items-center justify-center gap-3 group">
              <div className="bg-white/5 p-4 rounded-full group-hover:bg-amber-300/10 transition-colors">
                <FaUpload className="text-2xl text-white/50 group-hover:text-amber-300" />
              </div>
              <span className="text-white/60 font-medium">{uploading ? 'Uploading Images...' : 'Click to Upload Multiple Images'}</span>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
          </div>

          <div className="pt-6 flex justify-end gap-4 border-t border-white/10">
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', description: '', images: [], date: '', certificateLink: '' }); }} className="px-6 py-3 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 transition-colors">
                Cancel
              </button>
            )}
            <button type="submit" disabled={uploading} className={`bg-amber-300 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-lg ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <FaSave className="text-lg" />
              {editingId ? 'Update Achievement' : 'Save Achievement'}
            </button>
          </div>
        </form>
      </div>

      {/* List View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.length === 0 ? (
          <div className="bg-[#222224] border border-white/20 rounded-3xl p-10 text-center text-white/50 col-span-full font-medium tracking-wide">
            No achievements added yet. Start by adding one above.
          </div>
        ) : (
          achievements.map((achievement) => {
            const displayImages = achievement.images?.length ? achievement.images : (achievement.image ? [achievement.image] : []);
            
            return (
              <div key={achievement._id} className="bg-[#222224] border border-white/20 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-300/30 transition-all shadow-xl">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-xl font-bold text-white leading-tight">{achievement.title}</h3>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handleEdit(achievement)} className="bg-white/10 hover:bg-amber-300 hover:text-black p-2.5 rounded-xl transition-colors"><FaPlus className="rotate-45" style={{ display: 'none' }} /> Edit</button>
                      <button onClick={() => handleDelete(achievement._id)} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-2.5 rounded-xl transition-colors"><FaTrash /></button>
                    </div>
                  </div>
                  
                  {displayImages.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4 py-1">
                      {displayImages.map((img, idx) => (
                        <img key={idx} src={img} alt="Thumb" className="w-16 h-16 object-cover rounded-xl border border-white/10 flex-shrink-0" />
                      ))}
                    </div>
                  )}
                  
                  <p className="text-white/60 text-sm line-clamp-3 mb-4 leading-relaxed">{achievement.description}</p>
                </div>
                
                <div className="text-xs text-white/40 font-semibold tracking-wider pt-4 border-t border-white/5">
                  {new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ManageAchievements;