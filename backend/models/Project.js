import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Short Overview
  role: { type: String },                        // Added: Your Role
  duration: { type: String },                    // Added: Project timeline
  problem: { type: String, required: true },     
  solution: { type: String, required: true },    
  challenges: { type: String },                  // Added: Technical hurdles
  impact: { type: String },                      // Added: Results/Metrics
  features: [{ type: String }],                  // Added: Key features list
  thumbnail: { type: String, required: true },   
  images: [{ type: String }],                    
  techStack: [{ type: String }],
  liveLink: String,
  githubLink: String,
  video: String,
  category: { type: String, required: true },
  isComingSoon: { type: Boolean, default: false },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;