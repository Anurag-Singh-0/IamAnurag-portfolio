import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaUpload } from 'react-icons/fa';
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
    image: '',
    date: '',
    certificateLink: '',
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

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
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const response = await uploadImage(file);
      setFormData({ ...formData, image: response.data.url });
      setMessage({ type: 'success', text: 'Image uploaded successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload image' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (editingId) {
        await adminUpdateAchievement(editingId, formData);
        setMessage({ type: 'success', text: 'Achievement updated successfully' });
      } else {
        await adminCreateAchievement(formData);
        setMessage({ type: 'success', text: 'Achievement added successfully' });
      }
      setFormData({ title: '', description: '', image: '', date: '', certificateLink: '' });
      setEditingId(null);
      fetchAchievements();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save achievement' });
    }
  };

  const handleEdit = (achievement) => {
    setFormData({
      title: achievement.title || '',
      description: achievement.description || '',
      image: achievement.image || '',
      date: achievement.date || '',
      certificateLink: achievement.certificateLink || '',
    });
    setEditingId(achievement._id);
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
  };

  if (loading) return <div className="text-white/60">Loading achievements...</div>;

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Manage Achievements</h1>

      {message && (
        <div className={`px-4 py-3 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Achievement' : 'Add New Achievement'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" required className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-300 resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Achievement Image</label>
            <div className="flex items-center gap-4">
              {formData.image && <img src={formData.image} alt="Achievement" className="w-16 h-16 object-cover rounded-lg border border-white/10" />}
              <label className="cursor-pointer bg-[#222] border border-white/10 hover:border-amber-300/50 px-4 py-2 rounded-lg flex items-center gap-2">
                <FaUpload />
                <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Certificate Link (Optional)</label>
            <input type="url" name="certificateLink" value={formData.certificateLink} onChange={handleInputChange} placeholder="https://example.com/certificate" className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-300" />
          </div>

          <div className="pt-2">
            <button type="submit" className="bg-amber-300 hover:bg-amber-400 text-black font-bold px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <FaSave />
              {editingId ? 'Update Achievement' : 'Add Achievement'}
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {achievements.length === 0 ? (
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-8 text-center text-white/60">No achievements added yet.</div>
        ) : (
          achievements.map((achievement) => (
            <div key={achievement._id} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex-1 flex gap-4">
                {achievement.image && <img src={achievement.image} alt={achievement.title} className="w-16 h-16 object-cover rounded-lg border border-white/10" />}
                <div>
                  <h3 className="text-lg font-bold">{achievement.title}</h3>
                  <p className="text-white/60 text-sm line-clamp-2">{achievement.description}</p>
                  {achievement.date && <p className="text-xs text-white/40 mt-1">{new Date(achievement.date).toLocaleDateString()}</p>}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(achievement)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm transition-colors">Edit</button>
                <button onClick={() => handleDelete(achievement._id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg text-sm transition-colors">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageAchievements;