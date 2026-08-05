import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSave, FaUpload, FaPlus, FaTrash, 
  FaUserEdit, FaBriefcase, FaGraduationCap, FaCode, FaFilePdf, FaCheck
} from 'react-icons/fa';
import { adminFetchAbout, adminUpdateAbout, uploadImage } from "../../services/api";

function ManageAbout() {
  const [formData, setFormData] = useState({
    bio: '', resumeLink: '',
    experience: [], education: [], whatImDoing: [],
  });
  
  // States for clearing input fields after adding to list
  const initialExp = { company: '', role: '', period: '', location: '', description: '' };
  const initialEdu = { institution: '', degree: '', period: '', location: '', status: '' };
  const initialAct = { title: '', description: '', icon: 'Laptop' };

  const [expForm, setExpForm] = useState(initialExp);
  const [eduForm, setEduForm] = useState(initialEdu);
  const [actForm, setActForm] = useState(initialAct);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [message, setMessage] = useState('');
  
  const [activeTab, setActiveTab] = useState('bio');

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await adminFetchAbout();
      if (response.data) {
        setFormData({
          bio: response.data.bio || '',
          resumeLink: response.data.resumeLink || '',
          experience: response.data.experience || [],
          education: response.data.education || [],
          whatImDoing: response.data.whatImDoing || [],
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
    setFormData({ ...formData, [name]: value });
  };

  // --- Handlers for Adding Items to List & Clearing Form ---
  const handleAddExperience = () => {
    if (!expForm.company || !expForm.role) return alert("Company and Role are required!");
    setFormData(prev => ({ ...prev, experience: [...prev.experience, expForm] }));
    setExpForm(initialExp); // Clears the form fields
  };

  const handleAddEducation = () => {
    if (!eduForm.institution || !eduForm.degree) return alert("Institution and Degree are required!");
    setFormData(prev => ({ ...prev, education: [...prev.education, eduForm] }));
    setEduForm(initialEdu); // Clears the form fields
  };

  const handleAddActivity = () => {
    if (!actForm.title || !actForm.description) return alert("Title and Description are required!");
    setFormData(prev => ({ ...prev, whatImDoing: [...prev.whatImDoing, actForm] }));
    setActForm(initialAct); // Clears the form fields
  };

  // --- Handlers for Removing Items from List ---
  const removeArrayItem = (index, arrayName) => {
    const newArray = [...formData[arrayName]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadingResume(true);
    setMessage('');
    try {
      const response = await uploadImage(file); 
      setFormData({ ...formData, resumeLink: response.data.url });
      setMessage({ type: 'success', text: 'Resume PDF uploaded successfully!' });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload Resume PDF' });
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await adminUpdateAbout(formData);
      setMessage({ type: 'success', text: 'About section updated successfully' });
      setTimeout(() => setMessage(''), 4000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update about section' });
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'bio', label: 'Bio & Resume', icon: <FaUserEdit /> },
    { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
    { id: 'whatImDoing', label: 'Activities', icon: <FaCode /> },
  ];

  if (loading) return <div className="text-white/60 p-10 flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-300"></div></div>;

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 sm:px-6">
      <div className="mb-10 pt-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Manage <span className="text-amber-300">About Section</span></h1>
        <p className="text-white/50 mt-2 font-medium">Customize your portfolio's main profile, experience, and educational background.</p>
      </div>

      {message && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`px-5 py-4 rounded-2xl mb-8 font-medium shadow-lg flex items-center ${message.type === 'success' ? 'bg-[#151515] border border-green-500/30 text-green-400' : 'bg-[#151515] border border-red-500/30 text-red-400'}`}>
          {message.text}
        </motion.div>
      )}

      {/* Top Navigation Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-8 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 cursor-pointer ${
              activeTab === tab.id 
                ? 'bg-amber-300 text-black shadow-[0_4px_20px_-5px_rgba(253,224,71,0.4)]' 
                : 'bg-[#151515] text-white/50 border border-white/5 hover:bg-white/5 hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-[#151515] border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* 1. BIO & RESUME TAB */}
            {activeTab === 'bio' && (
              <motion.div key="bio" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} className="space-y-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-white/40 mb-2">Bio / Description</label>
                  <textarea name="bio" value={formData.bio} onChange={handleChange} rows="6" required className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-5 py-4 text-white outline-none focus:border-amber-300/50 resize-none transition-colors" placeholder="e.g., Aspiring Full-Stack & MERN Developer..." />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-white/40 mb-3">Upload Resume (PDF)</label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <label className="cursor-pointer bg-[#222224] border border-dashed border-white/20 hover:border-amber-300/50 w-full sm:w-1/2 p-6 rounded-2xl transition-all flex flex-col items-center justify-center gap-3 group">
                      <FaUpload className="text-amber-300 text-2xl group-hover:-translate-y-1 transition-transform" />
                      <span className="text-white/80 font-bold text-sm">{uploadingResume ? 'Uploading PDF...' : 'Click to Upload Resume'}</span>
                      <input type="file" accept="application/pdf" onChange={handleResumeUpload} className="hidden" disabled={uploadingResume} />
                    </label>
                    
                    {formData.resumeLink && (
                      <div className="w-full sm:w-1/2 bg-[#0d0d0d] border border-green-500/30 p-6 rounded-2xl flex items-center gap-4">
                        <FaFilePdf className="text-red-400 text-3xl shrink-0" />
                        <div className="overflow-hidden">
                          <p className="text-green-400 font-bold text-sm mb-1">Resume Uploaded</p>
                          <a href={formData.resumeLink} target="_blank" rel="noopener noreferrer" className="text-white/50 text-xs truncate block hover:text-amber-300">
                            {formData.resumeLink}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <motion.div key="experience" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                
                {/* Form to Add New Experience */}
                <div className="bg-[#0d0d0d] p-6 rounded-2xl border border-white/5 mb-8">
                  <h3 className="text-amber-300 font-bold mb-5 flex items-center gap-2"><FaPlus /> Add New Experience</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <input type="text" placeholder="Company Name *" value={expForm.company} onChange={(e) => setExpForm({...expForm, company: e.target.value})} className="bg-[#151515] border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-300/50 w-full" />
                    <input type="text" placeholder="Role * (e.g., Backend Intern)" value={expForm.role} onChange={(e) => setExpForm({...expForm, role: e.target.value})} className="bg-[#151515] border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-300/50 w-full" />
                    <input type="text" placeholder="Period (e.g., June 2023 - Present)" value={expForm.period} onChange={(e) => setExpForm({...expForm, period: e.target.value})} className="bg-[#151515] border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-300/50 w-full" />
                    <input type="text" placeholder="Location (e.g., Remote)" value={expForm.location} onChange={(e) => setExpForm({...expForm, location: e.target.value})} className="bg-[#151515] border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-300/50 w-full" />
                  </div>
                  <textarea placeholder="Describe your work and impact..." value={expForm.description} onChange={(e) => setExpForm({...expForm, description: e.target.value})} rows="3" className="bg-[#151515] border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-300/50 w-full resize-none mb-4" />
                  <button type="button" onClick={handleAddExperience} className="bg-amber-300 text-black px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-amber-400 transition-colors cursor-pointer">
                    Add to List
                  </button>
                </div>

                {/* List of Added Experiences */}
                <h3 className="text-white font-bold mb-4">Added Experiences ({formData.experience.length})</h3>
                <div className="space-y-4">
                  {formData.experience.map((exp, idx) => (
                    <div key={idx} className="bg-[#1a1a1a] p-5 rounded-2xl border border-white/10 flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-bold text-lg">{exp.role} <span className="text-amber-300 text-sm">@ {exp.company}</span></h4>
                        <p className="text-white/50 text-sm mt-1">{exp.period} | {exp.location}</p>
                      </div>
                      <button type="button" onClick={() => removeArrayItem(idx, 'experience')} className="text-red-400 hover:text-red-300 bg-red-400/10 p-2.5 rounded-lg transition-colors cursor-pointer"><FaTrash /></button>
                    </div>
                  ))}
                  {formData.experience.length === 0 && <p className="text-white/30 text-sm italic">No items added yet.</p>}
                </div>
              </motion.div>
            )}

            {/* 3. EDUCATION TAB */}
            {activeTab === 'education' && (
              <motion.div key="education" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                
                {/* Form to Add New Education */}
                <div className="bg-[#0d0d0d] p-6 rounded-2xl border border-white/5 mb-8">
                  <h3 className="text-amber-300 font-bold mb-5 flex items-center gap-2"><FaPlus /> Add New Education</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                    <input type="text" placeholder="Institution * (e.g., BBD University)" value={eduForm.institution} onChange={(e) => setEduForm({...eduForm, institution: e.target.value})} className="bg-[#151515] border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-300/50 w-full" />
                    <input type="text" placeholder="Degree * (e.g., BCA in Data Science)" value={eduForm.degree} onChange={(e) => setEduForm({...eduForm, degree: e.target.value})} className="bg-[#151515] border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-300/50 w-full" />
                    <input type="text" placeholder="Period (e.g., 2023 - 2026)" value={eduForm.period} onChange={(e) => setEduForm({...eduForm, period: e.target.value})} className="bg-[#151515] border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-300/50 w-full" />
                    <input type="text" placeholder="Status (e.g., Final Year Student)" value={eduForm.status} onChange={(e) => setEduForm({...eduForm, status: e.target.value})} className="bg-[#151515] border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-300/50 w-full" />
                    <input type="text" placeholder="Location (e.g., Lucknow)" value={eduForm.location} onChange={(e) => setEduForm({...eduForm, location: e.target.value})} className="bg-[#151515] border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-300/50 w-full md:col-span-2" />
                  </div>
                  <button type="button" onClick={handleAddEducation} className="bg-amber-300 text-black px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-amber-400 transition-colors cursor-pointer">
                    Add to List
                  </button>
                </div>

                {/* List of Added Education */}
                <h3 className="text-white font-bold mb-4">Added Education ({formData.education.length})</h3>
                <div className="space-y-4">
                  {formData.education.map((edu, idx) => (
                    <div key={idx} className="bg-[#1a1a1a] p-5 rounded-2xl border border-white/10 flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-bold text-lg">{edu.degree}</h4>
                        <p className="text-amber-300 text-sm mt-1">{edu.institution} <span className="text-white/40">| {edu.period}</span></p>
                      </div>
                      <button type="button" onClick={() => removeArrayItem(idx, 'education')} className="text-red-400 hover:text-red-300 bg-red-400/10 p-2.5 rounded-lg transition-colors cursor-pointer"><FaTrash /></button>
                    </div>
                  ))}
                  {formData.education.length === 0 && <p className="text-white/30 text-sm italic">No items added yet.</p>}
                </div>
              </motion.div>
            )}

            {/* 4. ACTIVITIES TAB */}
            {activeTab === 'whatImDoing' && (
              <motion.div key="whatImDoing" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                
                {/* Form to Add New Activity */}
                <div className="bg-[#0d0d0d] p-6 rounded-2xl border border-white/5 mb-8">
                  <h3 className="text-amber-300 font-bold mb-5 flex items-center gap-2"><FaPlus /> Add New Activity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                    <input type="text" placeholder="Title * (e.g., YouTube Content Creation)" value={actForm.title} onChange={(e) => setActForm({...actForm, title: e.target.value})} className="bg-[#151515] border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-300/50 w-full" />
                    <select value={actForm.icon} onChange={(e) => setActForm({...actForm, icon: e.target.value})} className="bg-[#151515] border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-300/50 w-full cursor-pointer">
                      <option value="Laptop">Laptop / Coding</option>
                      <option value="Code">Code Brackets</option>
                      <option value="Database">Database / Backend</option>
                      <option value="Lightbulb">Lightbulb / Logic</option>
                      <option value="Camera">Camera / Photography</option>
                      <option value="Video">Video / YouTube</option>
                      <option value="Globe">Globe / Web</option>
                    </select>
                  </div>
                  <textarea placeholder="Briefly describe this activity... *" value={actForm.description} onChange={(e) => setActForm({...actForm, description: e.target.value})} rows="3" className="bg-[#151515] border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-300/50 w-full resize-none mb-4" />
                  <button type="button" onClick={handleAddActivity} className="bg-amber-300 text-black px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-amber-400 transition-colors cursor-pointer">
                    Add to List
                  </button>
                </div>

                {/* List of Added Activities */}
                <h3 className="text-white font-bold mb-4">Added Activities ({formData.whatImDoing.length})</h3>
                <div className="space-y-4">
                  {formData.whatImDoing.map((item, idx) => (
                    <div key={idx} className="bg-[#1a1a1a] p-5 rounded-2xl border border-white/10 flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-bold text-lg flex items-center gap-2">
                          {item.title} <span className="text-xs bg-white/10 text-white/50 px-2 py-1 rounded">{item.icon} Icon</span>
                        </h4>
                        <p className="text-white/50 text-sm mt-2">{item.description}</p>
                      </div>
                      <button type="button" onClick={() => removeArrayItem(idx, 'whatImDoing')} className="text-red-400 hover:text-red-300 bg-red-400/10 p-2.5 rounded-lg transition-colors cursor-pointer"><FaTrash /></button>
                    </div>
                  ))}
                  {formData.whatImDoing.length === 0 && <p className="text-white/30 text-sm italic">No items added yet.</p>}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Sticky Global Save Button */}
        <div className="sticky bottom-6 mt-8 z-50">
          <button 
            type="submit" 
            disabled={saving} 
            className="w-full sm:w-auto ml-auto bg-amber-300 hover:bg-amber-400 text-black font-extrabold text-lg px-10 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(253,224,71,0.5)] disabled:opacity-70 cursor-pointer"
          >
            <FaSave className="text-xl" /> {saving ? 'Saving Data...' : 'Save All Changes'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default ManageAbout;