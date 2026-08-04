import About from '../models/About.js';

// Get about
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'About not found' });
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
    const about = await About.findOneAndUpdate(
      {},
      req.body,
      { new: true, runValidators: true }
    );
    if (!about) {
      return res.status(404).json({ message: 'About not found' });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};