import React, { useState, useEffect } from 'react';
import { 
  FaPlus, FaTrash, FaSave, FaUpload, FaProjectDiagram, FaTimes, 
  FaLink, FaGithub, FaVideo, FaImage, FaExclamationTriangle, 
  FaLightbulb, FaTools, FaChartLine, FaListUl, FaUserTie, FaBoxOpen 
} from 'react-icons/fa';
import {
  adminFetchProjects,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
  uploadImage,
} from '../../services/api';

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  // Tab State: 'project' or 'product'
  const [formType, setFormType] = useState('project');
  
  const [formData, setFormData] = useState({
    type: 'project',
    title: '', description: '', role: '', duration: '', 
    problem: '', solution: '', challenges: '', impact: '', 
    thumbnail: '', images: [], techStack: [], features: [], metrics: [],
    liveLink: '', githubLink: '', video: '', 
    category: 'Web Development', isComingSoon: false,
  });
  
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [metricInput, setMetricInput] = useState('');
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await adminFetchProjects();
      setProjects(response.data);
    } catch (error) {
      showMessage('error', 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleArrayAdd = (e, inputState, setInputState, arrayName) => {
    e.preventDefault();
    if (inputState.trim() && !formData[arrayName].includes(inputState.trim())) {
      setFormData({ ...formData, [arrayName]: [...formData[arrayName], inputState.trim()] });
      setInputState('');
    }
  };

  const handleArrayRemove = (itemToRemove, arrayName) => {
    setFormData({ ...formData, [arrayName]: formData[arrayName].filter((item) => item !== itemToRemove) });
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingThumb(true);
    try {
      const response = await uploadImage(file);
      setFormData((prev) => ({ ...prev, thumbnail: response.data.url }));
      showMessage('success', 'Thumbnail uploaded successfully');
    } catch (error) {
      showMessage('error', 'Failed to upload thumbnail');
    } finally {
      setUploadingThumb(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setUploadingGallery(true);
    let uploadedUrls = [...formData.images];
    
    for (let i = 0; i < files.length; i++) {
      setUploadProgress(`Uploading ${i + 1} of ${files.length}...`);
      try {
        const response = await uploadImage(files[i]);
        uploadedUrls.push(response.data.url);
      } catch (error) {
        console.error('Failed to upload image:', files[i].name);
      }
    }
    
    setFormData((prev) => ({ ...prev, images: uploadedUrls }));
    setUploadProgress('');
    setUploadingGallery(false);
    showMessage('success', 'Gallery images uploaded successfully');
  };

  const removeGalleryImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formType === 'project' && !formData.thumbnail && !editingId) {
      return showMessage('error', 'Please upload a project thumbnail');
    }

    try {
      const finalData = { ...formData, type: formType };
      if (editingId) {
        await adminUpdateProject(editingId, finalData);
        showMessage('success', `${formType === 'product' ? 'Product' : 'Project'} updated successfully`);
      } else {
        await adminCreateProject(finalData);
        showMessage('success', `${formType === 'product' ? 'Product' : 'Project'} added successfully`);
      }
      resetForm();
      fetchProjects();
    } catch (error) {
      showMessage('error', 'Failed to save');
    }
  };

  const handleEdit = (item) => {
    setFormType(item.type || 'project');
    setFormData({
      type: item.type || 'project',
      title: item.title || '', description: item.description || '', 
      role: item.role || '', duration: item.duration || '',
      problem: item.problem || '', solution: item.solution || '',
      challenges: item.challenges || '', impact: item.impact || '',
      thumbnail: item.thumbnail || '', images: item.images || [],
      techStack: item.techStack || [], features: item.features || [], metrics: item.metrics || [],
      liveLink: item.liveLink || '', githubLink: item.githubLink || '', 
      video: item.video || '', category: item.category || 'Web Development', 
      isComingSoon: item.isComingSoon || false,
    });
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this completely?')) return;
    try {
      await adminDeleteProject(id);
      fetchProjects();
      showMessage('success', 'Deleted successfully');
    } catch (error) {
      showMessage('error', 'Failed to delete');
    }
  };

  const resetForm = () => {
    setFormData({
      type: formType,
      title: '', description: '', role: '', duration: '', problem: '', solution: '', challenges: '', impact: '', 
      thumbnail: '', images: [], techStack: [], features: [], metrics: [], liveLink: '', githubLink: '', video: '', 
      category: 'Web Development', isComingSoon: false,
    });
    setEditingId(null);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-300"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <span className="bg-amber-300/10 text-amber-300 p-2.5 rounded-xl border border-amber-300/20">
            <FaProjectDiagram className="text-2xl" />
          </span>
          Manage Works
        </h1>
        <p className="text-white/50 mt-2 text-sm font-medium">Add standard projects or feature your own SaaS products.</p>
      </div>

      {message && (
        <div className={`relative px-6 py-4 rounded-xl mb-8 flex justify-between items-center shadow-lg ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
          <span className="font-medium text-sm">{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-white/50 hover:text-white cursor-pointer"><FaTimes /></button>
        </div>
      )}

      {/* Tab Switcher */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => { setFormType('project'); resetForm(); }}
          className={`flex-1 py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-2 transition-all cursor-pointer ${formType === 'project' ? 'bg-amber-300 text-black shadow-lg' : 'bg-[#151515] text-white/50 border border-white/10 hover:text-white hover:border-white/20'}`}
        >
          <FaProjectDiagram /> Project / Case Study
        </button>
        <button 
          onClick={() => { setFormType('product'); resetForm(); }}
          className={`flex-1 py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-2 transition-all cursor-pointer ${formType === 'product' ? 'bg-amber-300 text-black shadow-lg' : 'bg-[#151515] text-white/50 border border-white/10 hover:text-white hover:border-white/20'}`}
        >
          <FaBoxOpen /> My Product
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-[#151515] border border-white/5 rounded-2xl overflow-hidden mb-12 shadow-2xl relative p-6 md:p-8">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300/20 via-amber-300/60 to-amber-300/20"></div>
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {editingId ? <span className="text-blue-400">Edit {formType === 'product' ? 'Product' : 'Case Study'}</span> : <><FaPlus className="text-amber-300" /> Create New {formType === 'product' ? 'Product' : 'Case Study'}</>}
          </h2>
          {editingId && (
            <button onClick={resetForm} className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">Cancel Edit</button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Overview */}
          <div className="space-y-6">
            <h3 className="text-amber-300 font-semibold tracking-wider text-sm uppercase">1. Basic Info</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-300/50 outline-none" placeholder="e.g., FuryLand E-Commerce" />
              </div>
              
              {formType === 'project' && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white/70">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-300/50 outline-none cursor-pointer">
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                  </select>
                </div>
              )}

              {formType === 'project' && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaUserTie className="text-white/40" /> Your Role</label>
                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="e.g., Lead Full-Stack Developer" className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-300/50 outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-white/70">Duration / Timeline</label>
                    <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="e.g., Jan 2023 - Mar 2023 (3 Months)" className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-300/50 outline-none" />
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white/70">Short Description (Appears on Project Cards)</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={formType === 'product' ? "4" : "2"} required className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-300/50 outline-none resize-none" placeholder="Give a brief overview..." />
            </div>
          </div>

          {/* Product Specific: Metrics */}
          {formType === 'product' && (
            <div className="space-y-6 pt-6 border-t border-white/5">
              <h3 className="text-amber-300 font-semibold tracking-wider text-sm uppercase">2. Product Metrics / Badges</h3>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70">Add Metrics (e.g., "600+ users", "100+ paid sales")</label>
                <div className="flex gap-2">
                  <input type="text" value={metricInput} onChange={(e) => setMetricInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleArrayAdd(e, metricInput, setMetricInput, 'metrics')} placeholder="e.g., 600+ active users" className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2 text-white outline-none" />
                  <button type="button" onClick={(e) => handleArrayAdd(e, metricInput, setMetricInput, 'metrics')} className="bg-white/10 hover:bg-white/20 text-white px-6 rounded-xl transition-all cursor-pointer">Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.metrics.map((metric, idx) => (
                    <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
                      {metric} <button type="button" onClick={() => handleArrayRemove(metric, 'metrics')} className="text-red-400 hover:text-white cursor-pointer"><FaTimes /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Project Specific: Deep Dive */}
          {formType === 'project' && (
            <div className="space-y-6 pt-6 border-t border-white/5">
              <h3 className="text-amber-300 font-semibold tracking-wider text-sm uppercase">2. Deep Dive (The Case Study)</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaExclamationTriangle className="text-red-400" /> The Problem</label>
                  <textarea name="problem" value={formData.problem} onChange={handleInputChange} rows="4" className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-400/50 outline-none resize-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaLightbulb className="text-green-400" /> The Solution</label>
                  <textarea name="solution" value={formData.solution} onChange={handleInputChange} rows="4" className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-green-400/50 outline-none resize-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaTools className="text-purple-400" /> Technical Challenges Overcome</label>
                  <textarea name="challenges" value={formData.challenges} onChange={handleInputChange} rows="4" className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-400/50 outline-none resize-none" placeholder="What was hard and how did you fix it?" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaChartLine className="text-blue-400" /> Impact & Results</label>
                  <textarea name="impact" value={formData.impact} onChange={handleInputChange} rows="4" className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-400/50 outline-none resize-none" placeholder="e.g., Handled 10k requests, improved speed by 40%..." />
                </div>
              </div>
            </div>
          )}

          {/* Project Specific: Tech & Features */}
          {formType === 'project' && (
            <div className="space-y-6 pt-6 border-t border-white/5">
              <h3 className="text-amber-300 font-semibold tracking-wider text-sm uppercase">3. Features & Tech Stack</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaListUl className="text-white/40"/> Key Features</label>
                  <div className="flex gap-2">
                    <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleArrayAdd(e, featureInput, setFeatureInput, 'features')} placeholder="e.g., Real-time Chat using Socket.io" className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-300/50 outline-none" />
                    <button type="button" onClick={(e) => handleArrayAdd(e, featureInput, setFeatureInput, 'features')} className="bg-white/10 hover:bg-white/20 text-white px-6 rounded-xl transition-all cursor-pointer">Add</button>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {formData.features.map((feat, idx) => (
                      <li key={idx} className="bg-[#0d0d0d] border border-white/5 px-4 py-2 rounded-lg text-sm text-white/80 flex justify-between items-center">
                        <span>• {feat}</span>
                        <button type="button" onClick={() => handleArrayRemove(feat, 'features')} className="text-red-400 hover:text-red-300 cursor-pointer"><FaTrash size={12} /></button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white/70">Tech Stack Used</label>
                  <div className="flex gap-2">
                    <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleArrayAdd(e, techInput, setTechInput, 'techStack')} placeholder="e.g., React JS" className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-300/50 outline-none" />
                    <button type="button" onClick={(e) => handleArrayAdd(e, techInput, setTechInput, 'techStack')} className="bg-white/10 hover:bg-white/20 text-white px-6 rounded-xl transition-all cursor-pointer">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.techStack.map((tech, idx) => (
                      <span key={idx} className="bg-amber-300/10 border border-amber-300/20 text-amber-300 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                        {tech} <button type="button" onClick={() => handleArrayRemove(tech, 'techStack')} className="hover:text-white cursor-pointer"><FaTimes /></button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project Specific: Media (Thumbnail & Gallery) */}
          {formType === 'project' && (
            <div className="space-y-6 pt-6 border-t border-white/5">
              <h3 className="text-amber-300 font-semibold tracking-wider text-sm uppercase">4. Media & Visuals</h3>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70">Main Thumbnail</label>
                <div className="flex items-center gap-4 bg-[#0d0d0d] border border-white/10 p-3 rounded-xl w-fit">
                  {formData.thumbnail ? <img src={formData.thumbnail} alt="Thumbnail" className="w-24 h-16 object-cover rounded-lg border border-white/10" /> : <div className="w-24 h-16 bg-[#1a1a1a] rounded-lg border border-white/5 flex items-center justify-center"><FaImage className="text-white/20" /></div>}
                  <label className="cursor-pointer bg-[#151515] border border-white/10 hover:border-amber-300/50 px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all">
                    <FaUpload className="text-amber-300/70" />
                    <span className="text-sm">{uploadingThumb ? 'Uploading...' : 'Upload Thumbnail'}</span>
                    <input type="file" accept="image/*" onChange={handleThumbnailUpload} className="hidden" disabled={uploadingThumb || uploadingGallery} />
                  </label>
                </div>
              </div>

              {/* Gallery Upload section completely restored */}
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-sm font-semibold text-white/70 flex justify-between">
                  <span>Gallery Images (Max 30)</span>
                  <span className="text-amber-300">{formData.images.length} added</span>
                </label>
                <div className="bg-[#0d0d0d] border border-dashed border-white/20 hover:border-amber-300/50 rounded-xl p-6 text-center">
                  <label className="cursor-pointer flex flex-col items-center justify-center gap-3">
                    <FaUpload className="text-3xl text-amber-300/50" />
                    <span className="text-white/70 font-medium">Click to select multiple images</span>
                    <span className="text-amber-300 text-sm font-bold">{uploadProgress}</span>
                    <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" disabled={uploadingThumb || uploadingGallery} />
                  </label>
                </div>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mt-4">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"><FaTrash /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Links (Common) */}
          <div className="space-y-6 pt-6 border-t border-white/5">
            <h3 className="text-amber-300 font-semibold tracking-wider text-sm uppercase">{formType === 'product' ? '3' : '5'}. Links</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaLink className="text-blue-400" /> Live Website / Demo</label>
                <input type="url" name="liveLink" value={formData.liveLink} onChange={handleInputChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-blue-400/50 outline-none" placeholder="https://" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaGithub className="text-white" /> Source Code</label>
                <input type="url" name="githubLink" value={formData.githubLink} onChange={handleInputChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-white/50 outline-none" placeholder="https://" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaVideo className="text-red-400" /> YouTube/Video</label>
                <input type="url" name="video" value={formData.video || ''} onChange={handleInputChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-red-400/50 outline-none" placeholder="https://" />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" name="isComingSoon" checked={formData.isComingSoon} onChange={handleInputChange} className="sr-only" />
                <div className={`block w-14 h-7 rounded-full transition-colors ${formData.isComingSoon ? 'bg-amber-300' : 'bg-[#0d0d0d] border border-white/20'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${formData.isComingSoon ? 'transform translate-x-7 bg-black' : ''}`}></div>
              </div>
              <span className={`text-sm font-medium transition-colors ${formData.isComingSoon ? 'text-amber-300' : 'text-white/50 group-hover:text-white'}`}>Mark as "Coming Soon"</span>
            </label>

            <button type="submit" disabled={uploadingThumb || uploadingGallery} className="w-full sm:w-auto cursor-pointer bg-amber-300 hover:bg-amber-400 text-black font-bold px-10 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 shadow-[0_0_15px_rgba(252,211,77,0.2)]">
              <FaSave className="text-lg" /> {editingId ? 'Update' : 'Publish'} {formType === 'product' ? 'Product' : 'Case Study'}
            </button>
          </div>
        </form>
      </div>

      {/* Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full bg-[#151515] border border-white/5 rounded-2xl p-12 text-center">
            <p className="text-white/40">No entries added yet.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="bg-[#151515] border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-amber-300/30 transition-all group shadow-lg">
              {project.type === 'product' ? (
                <div className="p-5 flex-1 flex flex-col bg-[#1a1a1a]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <span className="text-[10px] uppercase tracking-wider text-blue-300 bg-blue-300/10 px-2 py-1 rounded border border-blue-300/20">Product</span>
                  </div>
                  <p className="text-white/50 text-sm line-clamp-3 mb-5 flex-1">{project.description}</p>
                </div>
              ) : (
                <>
                  <div className="h-48 overflow-hidden relative">
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white line-clamp-1">{project.title}</h3>
                      <span className="text-[10px] uppercase tracking-wider text-amber-300 bg-amber-300/10 px-2 py-1 rounded border border-amber-300/20">Project</span>
                    </div>
                  </div>
                </>
              )}
              
              <div className="flex items-center gap-3 p-5 pt-0 mt-auto border-t border-white/5">
                <button onClick={() => handleEdit(project)} className="flex-1 bg-[#1a1a1a] hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 text-white hover:text-blue-400 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2">Edit</button>
                <button onClick={() => handleDelete(project._id)} className="flex-1 bg-[#1a1a1a] hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 text-white hover:text-red-400 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageProjects;