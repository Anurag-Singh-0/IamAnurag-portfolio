import React, { useState, useEffect } from 'react';
import { 
  FaPlus, FaTrash, FaSave, FaUpload, FaProjectDiagram, FaTimes, 
  FaLink, FaGithub, FaVideo, FaImage, FaExclamationTriangle, 
  FaLightbulb, FaTools, FaChartLine, FaListUl, FaUserTie 
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
  
  const [formData, setFormData] = useState({
    title: '', description: '', role: '', duration: '', 
    problem: '', solution: '', challenges: '', impact: '', 
    thumbnail: '', images: [], techStack: [], features: [], 
    liveLink: '', githubLink: '', video: '', 
    category: 'Web Development', isComingSoon: false,
  });
  
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
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

  const handleTechAdd = (e) => {
    e.preventDefault();
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData({ ...formData, techStack: [...formData.techStack, techInput.trim()] });
      setTechInput('');
    }
  };

  const handleTechRemove = (tech) => {
    setFormData({ ...formData, techStack: formData.techStack.filter((t) => t !== tech) });
  };

  const handleFeatureAdd = (e) => {
    e.preventDefault();
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const handleFeatureRemove = (feature) => {
    setFormData({ ...formData, features: formData.features.filter((f) => f !== feature) });
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
    if (!formData.thumbnail && !editingId) return showMessage('error', 'Please upload a project thumbnail');

    try {
      if (editingId) {
        await adminUpdateProject(editingId, formData);
        showMessage('success', 'Project updated successfully');
      } else {
        await adminCreateProject(formData);
        showMessage('success', 'Project added successfully');
      }
      resetForm();
      fetchProjects();
    } catch (error) {
      showMessage('error', 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || '', description: project.description || '', 
      role: project.role || '', duration: project.duration || '',
      problem: project.problem || '', solution: project.solution || '',
      challenges: project.challenges || '', impact: project.impact || '',
      thumbnail: project.thumbnail || '', images: project.images || [],
      techStack: project.techStack || [], features: project.features || [],
      liveLink: project.liveLink || '', githubLink: project.githubLink || '', 
      video: project.video || '', category: project.category || 'Web Development', 
      isComingSoon: project.isComingSoon || false,
    });
    setEditingId(project._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project completely?')) return;
    try {
      await adminDeleteProject(id);
      fetchProjects();
      showMessage('success', 'Project deleted successfully');
    } catch (error) {
      showMessage('error', 'Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '', description: '', role: '', duration: '', problem: '', solution: '', challenges: '', impact: '', 
      thumbnail: '', images: [], techStack: [], features: [], liveLink: '', githubLink: '', video: '', 
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
          Advanced Case Studies
        </h1>
        <p className="text-white/50 mt-2 text-sm font-medium">Build highly detailed project showcases to impress top recruiters.</p>
      </div>

      {message && (
        <div className={`relative px-6 py-4 rounded-xl mb-8 flex justify-between items-center shadow-lg ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
          <span className="font-medium text-sm">{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-white/50 hover:text-white cursor-pointer"><FaTimes /></button>
        </div>
      )}

      {/* Form Container */}
      <div className="bg-[#151515] border border-white/5 rounded-2xl overflow-hidden mb-12 shadow-2xl relative p-6 md:p-8">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300/20 via-amber-300/60 to-amber-300/20"></div>
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {editingId ? <span className="text-blue-400">Edit Case Study</span> : <><FaPlus className="text-amber-300" /> Create New Case Study</>}
          </h2>
          {editingId && (
            <button onClick={resetForm} className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">Cancel Edit</button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Overview */}
          <div className="space-y-6">
            <h3 className="text-amber-300 font-semibold tracking-wider text-sm uppercase">1. Overview</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70">Project Title</label>
                <input type="text" name="title" value={formData.title || ''} onChange={handleInputChange} required className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-300/50 outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70">Category</label>
                <select name="category" value={formData.category || 'Web Development'} onChange={handleInputChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-300/50 outline-none cursor-pointer">
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaUserTie className="text-white/40" /> Your Role</label>
                <input type="text" name="role" value={formData.role || ''} onChange={handleInputChange} placeholder="e.g., Lead Full-Stack Developer" className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-300/50 outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70">Duration / Timeline</label>
                <input type="text" name="duration" value={formData.duration || ''} onChange={handleInputChange} placeholder="e.g., Jan 2023 - Mar 2023 (3 Months)" className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-300/50 outline-none" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white/70">Short Description (Appears on Project Cards)</label>
              <textarea name="description" value={formData.description || ''} onChange={handleInputChange} rows="2" required className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-300/50 outline-none resize-none" />
            </div>
          </div>

          {/* Section 2: Deep Dive */}
          <div className="space-y-6 pt-6 border-t border-white/5">
            <h3 className="text-amber-300 font-semibold tracking-wider text-sm uppercase">2. Deep Dive (The Case Study)</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaExclamationTriangle className="text-red-400" /> The Problem</label>
                <textarea name="problem" value={formData.problem || ''} onChange={handleInputChange} rows="4" required className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-400/50 outline-none resize-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaLightbulb className="text-green-400" /> The Solution</label>
                <textarea name="solution" value={formData.solution || ''} onChange={handleInputChange} rows="4" required className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-green-400/50 outline-none resize-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaTools className="text-purple-400" /> Technical Challenges Overcome</label>
                <textarea name="challenges" value={formData.challenges || ''} onChange={handleInputChange} rows="4" className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-400/50 outline-none resize-none" placeholder="What was hard and how did you fix it?" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaChartLine className="text-blue-400" /> Impact & Results</label>
                <textarea name="impact" value={formData.impact || ''} onChange={handleInputChange} rows="4" className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-400/50 outline-none resize-none" placeholder="e.g., Handled 10k requests, improved speed by 40%..." />
              </div>
            </div>
          </div>

          {/* Section 3: Lists & Stack */}
          <div className="space-y-6 pt-6 border-t border-white/5">
            <h3 className="text-amber-300 font-semibold tracking-wider text-sm uppercase">3. Features & Tech Stack</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaListUl className="text-white/40"/> Key Features</label>
                <div className="flex gap-2">
                  <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleFeatureAdd(e)} placeholder="e.g., Real-time Chat using Socket.io" className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-300/50 outline-none" />
                  <button type="button" onClick={handleFeatureAdd} className="bg-white/10 hover:bg-white/20 text-white px-6 rounded-xl transition-all cursor-pointer">Add</button>
                </div>
                <ul className="mt-3 space-y-2">
                  {formData.features.map((feat, idx) => (
                    <li key={idx} className="bg-[#0d0d0d] border border-white/5 px-4 py-2 rounded-lg text-sm text-white/80 flex justify-between items-center">
                      <span>• {feat}</span>
                      <button type="button" onClick={() => handleFeatureRemove(feat)} className="text-red-400 hover:text-red-300 cursor-pointer"><FaTrash size={12} /></button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70">Tech Stack Used</label>
                <div className="flex gap-2">
                  <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleTechAdd(e)} placeholder="e.g., React JS" className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-300/50 outline-none" />
                  <button type="button" onClick={handleTechAdd} className="bg-white/10 hover:bg-white/20 text-white px-6 rounded-xl transition-all cursor-pointer">Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.techStack.map((tech, idx) => (
                    <span key={idx} className="bg-amber-300/10 border border-amber-300/20 text-amber-300 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                      {tech} <button type="button" onClick={() => handleTechRemove(tech)} className="hover:text-white cursor-pointer"><FaTimes /></button>
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Section 4: Media */}
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

          {/* Section 5: Links */}
          <div className="space-y-6 pt-6 border-t border-white/5">
            <h3 className="text-amber-300 font-semibold tracking-wider text-sm uppercase">5. Deployment & Links</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaLink className="text-blue-400" /> Live Demo</label>
                <input type="url" name="liveLink" value={formData.liveLink || ''} onChange={handleInputChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-blue-400/50 outline-none" placeholder="https://" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70 flex items-center gap-2"><FaGithub className="text-white" /> Source Code</label>
                <input type="url" name="githubLink" value={formData.githubLink || ''} onChange={handleInputChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-white/50 outline-none" placeholder="https://" />
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
              <FaSave className="text-lg" /> {editingId ? 'Update Case Study' : 'Publish Case Study'}
            </button>
          </div>
        </form>
      </div>

      {/* Projects Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full bg-[#151515] border border-white/5 rounded-2xl p-12 text-center">
            <p className="text-white/40">No projects added yet.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="bg-[#151515] border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-amber-300/30 transition-all group shadow-lg">
              <div className="h-48 overflow-hidden relative">
                <img src={project.thumbnail} alt={project.title} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${project.isComingSoon ? 'blur-[2px] brightness-50' : ''}`} />
                {project.isComingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="bg-amber-300 text-black font-bold text-xs px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Coming Soon</span>
                  </div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white line-clamp-1">{project.title}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-amber-300 bg-amber-300/10 px-2 py-1 rounded border border-amber-300/20">{project.category}</span>
                </div>
                <p className="text-white/50 text-sm line-clamp-2 mb-5 flex-1">{project.description}</p>
                
                {/* Fixed Admin Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                  <button onClick={() => handleEdit(project)} className="flex-1 bg-[#1a1a1a] hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 text-white hover:text-blue-400 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2">
                    Edit Project
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="flex-1 bg-[#1a1a1a] hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 text-white hover:text-red-400 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageProjects;