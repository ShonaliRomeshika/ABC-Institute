const express = require("express");
const router = express.Router();
const program = require("../models/program.model.js");

//Get all programs
router.get ("/programs", async (req, res, next) => {
    let programs;
    try {
      programs = await program.find();
    } catch (err) {
      console.log(err);
    }
  
    if (!programs) {
      return res.status(404).json({ message: "No program found" });
    }
    return res.status(200).json({ 
      success: true,
      existingprograms: programs 
    });
  });

    // add new program
router.post("/program/add", async (req, res, next) => {
  const { name, duration, cost } = req.body;
  const lastProgram = await program.find().sort({ _id: -1 }).limit(1).exec();
  const lastProgramId = lastProgram.length > 0 ? lastProgram[0].program_id : null;
  let newProgram = new program({
    name,
    duration,
    cost,
  });
  if (lastProgramId) {
    const newProgramId = "P" + (parseInt(lastProgramId.slice(1)) + 1).toString().padStart(2, "0");
    newProgram.program_id = newProgramId;
  }
  try {
    await newProgram.save();
    res.status(201).json({ success: true, newProgram });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



//Get specific program
router.get("/program/:id", async (req, res, next) => {
  const id = req.params.id;
  let prm;
  console.log(`Retrieving program data for ID: ${id}`); 
  console.log("Inside try block"); 
  try {
    prm = await program.findById(id);
    console.log("program data retrieved:", prm); 
  } catch (err) {
    console.log(err);
  }
  if (!prm) {
    return res.status(404).json({ message: "No program found" });
  }
  return res.status(200).json({
    success: true,
    program: prm,
  });
});


  //Update specific program
  router.put('/program/update/:id', async(req,res) => {
    const id = req.params.id;
    const { 
      program_id,  
      name, 
      duration, 
      cost
    } = req.body;
    let prm;
    try {
        prm = await program.findByIdAndUpdate(id, {
          program_id,  
          name, 
          duration, 
          cost
      });
      prm = await prm.save();
    } catch (err) {
      console.log(err);
    }
    if (!prm) {
      return res.status(404).json({ message: "Unable To update by this ID" });
    }
    return res.status(200).json({ 
      success: "Update Succesfully",
      program: prm
    });
  });

//Delete specific program
router.delete('/program/delete/:id' ,async(req,res) =>{
    const id = req.params.id;
    let prm;
    try {
        prm = await program.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!prm) {
      return res.status(404).json({ message: "Unable to delete by this ID" });
    }
    return res.status(200).json({ message: "program successfully deleted" });
  });



  module.exports = router;