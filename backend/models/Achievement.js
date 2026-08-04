import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
  certificateLink: String,
}, { timestamps: true });

const Achievement = mongoose.model('Achievement', achievementSchema);
export default Achievement;