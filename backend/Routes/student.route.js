const express = require("express");
const router = express.Router();
const student = require("../models/student.model.js");
const studentHasProgram = require("../models/studentHasProgram.model.js");

//Get all students
router.get("/", async (req, res, next) => {
  let students;
  try {
    students = await student.find();
  } catch (err) {
    console.log(err);
  }

  if (!students) {
    return res.status(404).json({ message: "No student found" });
  }
  return res.status(200).json({
    success: true,
    existingstudents: students,
  });
});

//add new student and register to a program
router.post("/add", async (req, res, next) => {
  const { name, address, contact, program_id } = req.body;
  const lastStudent = await student.find().sort({_id: -1}).limit(1).exec();
  const lastStudentId = lastStudent.length === 0 ? "S0000" : lastStudent[0].student_id;
  const nextStudentId = "S" + String(parseInt(lastStudentId.substring(1)) + 1).padStart(4, "0");
  let std;
  try {
    std = new student({
      student_id: nextStudentId,
      name,
      address,
      contact,
    });
    await std.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable To Add" });
  }
/*
  let stdProgram;
  try {
    stdProgram = new studentHasProgram({
      student_id: std._id,
      program_id,
    });
    await stdProgram.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable To Register To Program" });
  }

  return res.status(200).json({
    success: true,
    message: "Registered Successfully",
    data: {
      stdProgram,
    },
  });    */
});

//Get specific student
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let std;
  console.log(`Retrieving student data for ID: ${id}`);
  console.log("Inside try block");
  try {
    std = await student.findById(id);
    console.log("student data retrieved:", std);
  } catch (err) {
    console.log(err);
  }
  if (!std) {
    return res.status(404).json({ message: "No student found" });
  }
  return res.status(200).json({
    success: true,
    student: std,
  });
});

//Update specific student
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { student_id, name, address, contact } = req.body;
  let std;
  try {
    std = await student.findByIdAndUpdate(
      id,
      {
        student_id,
        name,
        address,
        contact,
      },
      { new: true } // return updated document
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  if (!std) {
    return res.status(404).json({ message: "Unable To update by this ID" });
  }
  return res.status(200).json({
    success: "Update Succesfully",
    student: std,
  });
});


// Delete specific student
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  let std;
  try {
  std = await student.findById(id);
  if (!std) {
  return res.status(404).json({ message: "No student found" });
  }
  await studentHasProgram.deleteMany({ student_id: id });
  await student.deleteOne({ _id: id });
  } catch (err) {
  console.log(err);
  return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ message: "Student deleted successfully" });
  });
  
  module.exports = router;




/*
const express = require("express");
const router = express.Router();
const student = require("../models/student.model.js");

//Get all students
router.get ("/", async (req, res, next) => {
    let students;
    try {
        students = await student.find();
    } catch (err) {
      console.log(err);
    }
  
    if (!students) {
      return res.status(404).json({ message: "No student found" });
    }
    return res.status(200).json({ 
      success: true,
      existingstudents: students 
    });
  });

    // add new student
router.post("/add", async (req, res, next) => {
  const {
    student_id,
    name,
    address,
    contact,
    program_id // add program_id to the request body
  } = req.body;

  let std;
  try {
    std = new student({
      student_id,
      name,
      address,
      contact,
      program_id // include program_id in the student object
    });
    await std.save();
  } catch (err) {
    console.log(err);
  }

  if (!std) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({
    success: "Student added successfully",
    student: std
  });
});



//Get specific student
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let std;
  console.log(`Retrieving student data for ID: ${id}`); 
  console.log("Inside try block"); 
  try {
    std = await student.findById(id);
    console.log("student data retrieved:", std); 
  } catch (err) {
    console.log(err);
  }
  if (!std) {
    return res.status(404).json({ message: "No student found" });
  }
  return res.status(200).json({
    success: true,
    student: std,
  });
});


  //Update specific student
  router.put('/update/:id', async(req,res) => {
    const id = req.params.id;
    const { 
        student_id,  
        name, 
        address, 
        contact
    } = req.body;
    let std;
    try {
        std = await student.findByIdAndUpdate(id, {
            student_id,  
            name, 
            address, 
            contact
      });
      std = await std.save();
    } catch (err) {
      console.log(err);
    }
    if (!std) {
      return res.status(404).json({ message: "Unable To update by this ID" });
    }
    return res.status(200).json({ 
      success: "Update Succesfully",
      student: std
    });
  });

//Delete specific student
router.delete('/delete/:id' ,async(req,res) =>{
    const id = req.params.id;
    let std;
    try {
        std = await student.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!std) {
      return res.status(404).json({ message: "Unable to delete by this ID" });
    }
    return res.status(200).json({ message: "student successfully deleted" });
  });



  module.exports = router;
  */