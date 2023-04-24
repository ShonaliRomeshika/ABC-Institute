const express = require('express');
const router = express.Router();
const studentHasProgram = require('../models/studentHasProgram.model');

// Get all student program registrations
router.get('/registrations', async (req, res, next) => {
  try {
    const registrations = await studentHasProgram.find().populate('student_id').populate('program_id');
    return res.status(200).json({
      success: true,
      registrations: registrations
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to get student program registrations" });
  }
});

// Get specific student program registration
router.get('/registration/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const registration = await studentHasProgram.findById(id).populate('student_id').populate('program_id');
    if (!registration) {
      return res.status(404).json({ message: "No registration found" });
    }
    return res.status(200).json({
      success: true,
      registration: registration
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to get student program registration" });
  }
});

// Add new student program registration
router.post('/registration/add', async (req, res, next) => {
  const { student_id, program_id } = req.body;
  let registration;
  try {
    registration = new studentHasProgram({ student_id, program_id });
    await registration.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add student program registration" });
  }
  return res.status(201).json({
    success: true,
    registration: registration
  });
});

// Update specific student program registration
router.put('/registration/update/:id', async (req, res, next) => {
  const id = req.params.id;
  const { student, program } = req.body;
  let registration;
  try {
    registration = await studentHasProgram.findByIdAndUpdate(id, { student, program }, { new: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to update student program registration" });
  }
  if (!registration) {
    return res.status(404).json({ message: "Unable to update by this ID" });
  }
  return res.status(200).json({
    success: true,
    registration: registration
  });
});

// Delete specific student program registration
router.delete('/registration/delete/:id', async (req, res, next) => {
  const id = req.params.id;
  let registration;
  try {
    registration = await studentHasProgram.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to delete student program registration" });
  }
  if (!registration) {
    return res.status(404).json({ message: "Unable to delete by this ID" });
  }
  return res.status(200).json({ message: "Student program registration successfully deleted" });
});

module.exports = router;
