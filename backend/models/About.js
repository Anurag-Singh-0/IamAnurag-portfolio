import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    bio: { type: String, required: true },
    resumeLink: { type: String, required: true }, // Stores the uploaded PDF URL
    
    
    experience: [{
      company: String,
      role: String,
      period: String,
      location: String,
      description: String
    }],
    education: [{
      institution: String,
      degree: String,
      period: String,
      location: String,
      status: String
    }],
    whatImDoing: [{
      title: String,
      description: String,
      icon: String 
    }],
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);
export default About;