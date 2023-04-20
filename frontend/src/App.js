import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import './App.css';

import Header from "./components/Header";
import students from "./components/students/students";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
        <Route path="/students" exact Component={ students } > </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

