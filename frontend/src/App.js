import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import './App.css';

import Header from "./components/Header";
import students from "./components/students/students";
import programs from "./components/programs/programs";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
        <Route path="/students" exact Component={ students } > </Route>
        <Route path="/programs" exact Component={ programs } > </Route>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

