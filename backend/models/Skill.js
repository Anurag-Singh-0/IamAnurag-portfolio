import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  category: { 
    type: String, 
    required: true 
  },
  proficiency: { type: Number, min: 0, max: 100, required: true },
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;