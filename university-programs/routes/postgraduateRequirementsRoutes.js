const express = require('express');
const router = express.Router();
const PostgraduateRequirements = require('../models/PostgraduateRequirements');
const Program = require('../models/Program')

// Add postgraduate requirements
router.post('/', async (req, res) => {
  try {
    const program = await Program.findById(req.body.program_id);
    if (!program) {
      return res.status(404).send({ error: 'Postgraduate Program not found.' });
    }
    if (program.program_type !== 'Postgraduate') {
      return res.status(400).send({ error: 'Postgraduate requirements can only be added to Postgraduate programs.' });
    }
    const existingRequirements = await PostgraduateRequirements.findOne({ program_id: req.body.program_id });
    if (existingRequirements) {
      return res.status(409).send({ error: 'Postgraduate requirements already exist for this program.' });
    }

    const requirements = new PostgraduateRequirements(req.body);
    await requirements.save();
    res.status(201).send(requirements);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all postgraduate requirements
router.get('/', async (req, res) => {
  try {
    const requirements = await PostgraduateRequirements.find().populate('program_id');
    res.send(requirements);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update postgraduate requirements
router.put('/:id', async (req, res) => {
  try {
    const requirements = await PostgraduateRequirements.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!requirements) {
      return res.status(404).send({ error: 'Postgraduate requirements not found' });
    }
    res.send(requirements);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete postgraduate requirements
router.delete('/:id', async (req, res) => {
  try {
    const requirements = await PostgraduateRequirements.findByIdAndDelete(req.params.id);
    if (!requirements) {
      return res.status(404).send({ error: 'Postgraduate requirements not found' });
    }
    res.send(requirements);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
