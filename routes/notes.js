const express = require('express');
const { Note } = require('../models');
const router = express.Router();

// Create a note
router.post('/', async (req, res) => {
  try {
    const { title, description, category, completed } = req.body;
    const note = await Note.create({ title, description, category, completed });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all notes
router.get('/', async (req, res) => {
  const { search, category } = req.query;
  const where = {};

  if (search) where.title = { [require('sequelize').Op.like]: `%${search}%` };
  if (category) where.category = category;

  try {
    const notes = await Note.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, completed } = req.body;
    const note = await Note.findByPk(req.params.id);

    if (!note) return res.status(404).json({ message: 'Note not found' });

    await note.update({ title, description, category, completed });
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    await note.destroy();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
