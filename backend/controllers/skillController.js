import Skill from '../models/Skill.js';

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { name, icon, category, proficiency } = req.body;

    // Validation
    if (!name || !icon || !category) {
      return res.status(400).json({ 
        success: false,
        message: 'Name, icon, and category are required' 
      });
    }

    const skill = new Skill({
      name,
      icon,
      category,
      proficiency: proficiency || 50,
    });

    await skill.save();
    res.status(201).json({ success: true, skill });
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};