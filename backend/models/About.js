import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    profileImage: { type: String, required: true },
    resumeLink: { type: String, required: true },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
      youtube: String,
    },
  },
  { timestamps: true },
);

const About = mongoose.model("About", aboutSchema);
export default About;
