import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import './App.css';

import Header from "./components/Header";
import students from "./components/students/students";
import programs from "./components/programs/programs";
import createProgram from "./components/programs/createProgram";
import EditProgram from "./components/programs/editProgram";

import createStudent from "./components/students/createStudent";
import EditStudent from "./components/students/editStudent";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
        <Route path="/students" exact Component={ students } > </Route>
        <Route path="/programs" exact Component={ programs } > </Route>
        <Route path="/program/add" exact Component={ createProgram } > </Route>
        <Route path="/program/update/:id" exact Component={ EditProgram } > </Route>
        <Route path="/students/add" exact Component={ createStudent } > </Route>
        <Route path="/student/update/:id" exact Component={ EditStudent } > </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;

