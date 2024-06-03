const express = require('express');
const router = express.Router();
const University = require('../models/University');

// Add a university
router.post('/', async (req, res) => {
  try {
    const existingUniversity = await University.findOne({ name: req.body.name });
    if (existingUniversity) {
      return res.status(409).send({ error: 'University already exists.' });
    }
    const university = new University(req.body);
    await university.save();
    res.status(201).send(university);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).send({ errors });
    }
    res.status(500).send({ error: error.message });
  }
});

// Get all universities
router.get('/', async (req, res) => {
  try {
    const universities = await University.find();
    res.send(universities);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update a university
router.put('/:id', async (req, res) => {
  try {
    const university = await University.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!university) {
      return res.status(404).send({ error: 'University not found' });
    }
    res.send(university);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete a university
router.delete('/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).send({ error: 'University not found' });
    }
    await university.deleteOne();
    res.send({ message: 'University deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
