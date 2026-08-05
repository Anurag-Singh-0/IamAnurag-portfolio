import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  type: { type: String, enum: ['project', 'product'], default: 'project' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  role: { type: String },
  duration: { type: String },
  problem: { type: String },  // Made optional for Products
  solution: { type: String }, // Made optional for Products
  challenges: { type: String },
  impact: { type: String },
  features: [{ type: String }],
  metrics: [{ type: String }], // Added: For product stats (e.g., "600+ users", "100+ sales")
  thumbnail: { type: String }, // Made optional for Products
  images: [{ type: String }],
  techStack: [{ type: String }],
  liveLink: String,
  githubLink: String,
  video: String,
  category: { type: String, default: 'Product' },
  isComingSoon: { type: Boolean, default: false },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;