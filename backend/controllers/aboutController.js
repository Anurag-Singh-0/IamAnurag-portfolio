import About from '../models/About.js';

// Get about
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      // Return empty structure instead of 404 error
      return res.json({ 
        bio: "", 
        resumeLink: "", 
        experience: [], 
        education: [], 
        whatImDoing: [] 
      });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create about (first time)
export const createAbout = async (req, res) => {
  try {
    const about = new About(req.body);
    await about.save();
    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update about
export const updateAbout = async (req, res) => {
  try {
    // Added { upsert: true } so it creates the document if it doesn't exist
    const about = await About.findOneAndUpdate(
      {},
      req.body,
      { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};