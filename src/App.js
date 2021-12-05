import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import EditPage from "./pages/editPage.js";
import './App.css';



function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/editPage" element={<EditPage />} />
            
          

          <Route path="/" element={<Home />} />
            
          
        </Routes>
      </Router>

    </div>
  );
}

export default App;
