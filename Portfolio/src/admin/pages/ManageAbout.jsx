import { useState, useEffect } from 'react';
import { FaSave, FaUpload } from 'react-icons/fa';
import { adminFetchAbout, adminUpdateAbout, uploadImage } from "../../services/api";

function ManageAbout() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    profileImage: '',
    resumeLink: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      youtube: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await adminFetchAbout();
      if (response.data) {
        setFormData({
          name: response.data.name || '',
          title: response.data.title || '',
          bio: response.data.bio || '',
          profileImage: response.data.profileImage || '',
          resumeLink: response.data.resumeLink || '',
          socialLinks: {
            github: response.data.socialLinks?.github || '',
            linkedin: response.data.socialLinks?.linkedin || '',
            twitter: response.data.socialLinks?.twitter || '',
            instagram: response.data.socialLinks?.instagram || '',
            youtube: response.data.socialLinks?.youtube || '',
          },
        });
      }
    } catch (error) {
      console.error('Error fetching about:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const key = name.replace('social_', '');
      setFormData({
        ...formData,
        socialLinks: { ...formData.socialLinks, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage('');
    try {
      const response = await uploadImage(file);
      setFormData({ ...formData, profileImage: response.data.url });
      setMessage({ type: 'success', text: 'Image uploaded successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload image' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await adminUpdateAbout(formData);
      setMessage({ type: 'success', text: 'About section updated successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update about section' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Manage About Section</h1>

      {message && (
        <div className={`px-4 py-3 rounded-lg mb-6 ${
          message.type === 'success' 
            ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
            : 'bg-red-500/20 border border-red-500/30 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Profile Image</label>
          <div className="flex items-center gap-4">
            {formData.profileImage && (
              <img 
                src={formData.profileImage} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border border-white/10"
              />
            )}
            <label className="cursor-pointer bg-[#222] border border-white/10 hover:border-amber-300/50 px-4 py-2 rounded-lg transition-all flex items-center gap-2">
              <FaUpload />
              <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
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

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Professional Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Bio / Description</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            required
            className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300 resize-none"
          />
        </div>

        {/* Resume Link */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Resume Link (PDF)</label>
          <input
            type="url"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleChange}
            placeholder="https://example.com/resume.pdf"
            className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
          />
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-sm font-medium text-white/80 mb-3">Social Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['github', 'linkedin', 'twitter', 'instagram', 'youtube'].map((platform) => (
              <div key={platform}>
                <label className="block text-xs text-white/60 mb-1 capitalize">{platform}</label>
                <input
                  type="url"
                  name={`social_${platform}`}
                  value={formData.socialLinks[platform]}
                  onChange={handleChange}
                  placeholder={`https://${platform}.com/username`}
                  className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-amber-300 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSave />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManageAbout;