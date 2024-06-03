const express = require('express');
const router = express.Router();
const Program = require('../models/Program'); // Import Program model
const College = require('../models/College'); // Import College model

// Add a program
router.post('/', async (req, res) => {
  try {
    const college = await College.findById(req.body.college_id);
    if (!college) {
      return res.status(404).send({ error: 'College not found.' });
    }

    // Check if the program already exists
    const existingProgram = await Program.findOne({ name: req.body.name, university_id: req.body.university_id });
    if (existingProgram) {
      return res.status(409).send({ error: 'Program already exists.' });
    }

    const program = new Program(req.body);
    await program.save();
    res.status(201).send(program);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all programs
router.get('/', async (req, res) => {
  try {
    const programs = await Program.find().populate('college_id');
    res.send(programs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a program
router.put('/:id', async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!program) {
      return res.status(404).send({ error: 'Program not found' });
    }
    res.send(program);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a program
router.delete('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).send({ error: 'Program not found' });
    }
    await program.deleteOne();
    res.send({message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
