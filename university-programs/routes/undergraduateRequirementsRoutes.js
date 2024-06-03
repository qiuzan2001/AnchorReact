const express = require('express');
const router = express.Router();
const UndergraduateRequirements = require('../models/UndergraduateRequirements');
const Program = require('../models/Program')

// Add undergraduate requirements
router.post('/', async (req, res) => {
  try {
    const program = await Program.findById(req.body.program_id);
    if (!program) {
      return res.status(404).send({ error: 'Undergraduate Program not found.' });
    }

    if (program.program_type !== 'Undergraduate') {
      return res.status(400).send({ error: 'Undergraduate requirements can only be added to undergraduate programs.' });
    }
    
    const existingRequirements = await UndergraduateRequirements.findOne({ program_id: req.body.program_id });
    if (existingRequirements) {
      return res.status(409).send({ error: 'Undergraduate requirements already exist for this program.' });
    }

    const requirements = new UndergraduateRequirements(req.body);
    await requirements.save();
    res.status(201).send(requirements);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all undergraduate requirements
router.get('/', async (req, res) => {
  try {
    const requirements = await UndergraduateRequirements.find().populate('program_id');
    res.send(requirements);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update undergraduate requirements
router.put('/:id', async (req, res) => {
  try {
    const requirements = await UndergraduateRequirements.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!requirements) {
      return res.status(404).send({ error: 'Undergraduate requirements not found' });
    }
    res.send(requirements);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete undergraduate requirements
router.delete('/:id', async (req, res) => {
  try {
    const requirements = await UndergraduateRequirements.findById(req.params.id);
    if (!requirements) {
      return res.status(404).send({ error: 'Undergraduate requirements not found' });
    }
    await requirements.remove();
    res.send(requirements);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
