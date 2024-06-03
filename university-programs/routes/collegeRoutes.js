const express = require('express');
const router = express.Router();
const College = require('../models/College');
const University = require('../models/University'); // Import University model

// Add a college
router.post('/', async (req, res) => {
  try {
    // Check if the university exists
    const university = await University.findById(req.body.university_id);
    if (!university) {
      return res.status(404).send({ error: 'University not found.' });
    }

    // Check if the college already exists
    const existingCollege = await College.findOne({ name: req.body.name, university_id: req.body.university_id });
    if (existingCollege) {
      return res.status(409).send({ error: 'College already exists.' });
    }

    // Create a new college
    const college = new College(req.body);
    await college.save();
    res.status(201).send(college);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all colleges
router.get('/', async (req, res) => {
  try {
    const colleges = await College.find().populate('university_id');
    res.send(colleges);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a college
router.put('/:id', async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!college) {
      return res.status(404).send({ error: 'College not found' });
    }
    res.send(college);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a college
router.delete('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).send({ error: 'College not found' });
    }
    await college.deleteOne();
    res.send({message: 'college deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
