const express = require("express");
const router = express.Router();
const program = require("../models/studentHasProgram.model.js");

//Get all programs
router.get ("/registrations", async (req, res, next) => {
    let registrations;
    try {
      registrations = await registration.find();
    } catch (err) {
      console.log(err);
    }
  
    if (!registrations) {
      return res.status(404).json({ message: "No registration found" });
    }
    return res.status(200).json({ 
      success: true,
      existingregistrations: registrations 
    });
  });

    // add new registration
    router.post ("/register", async (req, res, next) => {
      const { 
          student_id,  
          program_id, 
          registerDate, 
      } = req.body;
      let rg; 
      try {
        rg = new registration({  
          student_id,  
          program_id, 
          registerDate, 
        });
        await rg.save();
      } catch (err) {
        console.log(err);
      }
    
      if (!rg) {
        return res.status(500).json({ message: "Unable To Register" });
      }
      return res.status(201).json({ 
        success:"Register successfully",
        registration: rg
      });
    });
  



//Get specific registration
router.get("/registration/:id", async (req, res, next) => {
  const id = req.params.id;
  let rg;
  console.log(`Retrieving registration data for ID: ${id}`); 
  console.log("Inside try block"); 
  try {
    rg = await registration.findById(id);
    console.log("registration data retrieved:", rg); 
  } catch (err) {
    console.log(err);
  }
  if (!rg) {
    return res.status(404).json({ message: "No registration found" });
  }
  return res.status(200).json({
    success: true,
    registration: rg,
  });
});


  //Update specific registration
  router.put('/registration/update/:id', async(req,res) => {
    const id = req.params.id;
    const { 
      student_id,  
      program_id, 
      registerDate, 
    } = req.body;
    let prm;
    try {
        prm = await program.findByIdAndUpdate(id, {
          student_id,
          program_id,  
          registerDate
      });
      rg = await rg.save();
    } catch (err) {
      console.log(err);
    }
    if (!rg) {
      return res.status(404).json({ message: "Unable To update by this ID" });
    }
    return res.status(200).json({ 
      success: "Update Succesfully",
      registration: rg
    });
  });

//Delete specific registration
router.delete('/registration/delete/:id' ,async(req,res) =>{
    const id = req.params.id;
    let rg;
    try {
        rg = await registration.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!rg) {
      return res.status(404).json({ message: "Unable to delete by this ID" });
    }
    return res.status(200).json({ message: "registration successfully deleted" });
  });

  module.exports = router;
/*
const express = require('express');
const router = express.Router();
const StudentHasProgram = require('../models/studentHasProgram.model');

// Get all student-program associations
router.get('/registrations', async (req, res) => {
  try {
    const studentPrograms = await StudentHasProgram.find();
    res.json(studentPrograms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific student-program association by ID
router.get('/registration/:id', getStudentProgram, (req, res) => {
  res.json(res.studentProgram);
});

// Create a new student-program association
router.post('/registration/add', async (req, res) => {
  const studentProgram = new StudentHasProgram({
    student_id: req.body.student_id,
    program_id: req.body.program_id,
    registerDate: req.body.registerDate
  });

  try {
    const newStudentProgram = await studentProgram.save();
    res.status(201).json(newStudentProgram);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a student-program association
router.put('/registration/update/:id', getStudentProgram, async (req, res) => {
  if (req.body.student_id != null) {
    res.studentProgram.student_id = req.body.student_id;
  }
  if (req.body.program_id != null) {
    res.studentProgram.program_id = req.body.program_id;
  }
  if (req.body.registerDate != null) {
    res.studentProgram.registerDate = req.body.registerDate;
  }

  try {
    const updatedStudentProgram = await res.studentProgram.save();
    res.json(updatedStudentProgram);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a student-program association
router.delete('/registration/delete/:id', getStudentProgram, async (req, res) => {
  try {
    await res.studentProgram.remove();
    res.json({ message: 'Student-program association deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a specific student-program association by ID
async function getStudentProgram(req, res, next) {
  let studentProgram;
  try {
    studentProgram = await StudentHasProgram.findById(req.params.id);
    if (studentProgram == null) {
      return res.status(404).json({ message: 'Cannot find student-program association' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.studentProgram = studentProgram;
  next();
}

module.exports = router;
*/
