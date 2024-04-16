import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import AddBook from "./components/AddBook";
import Register from "./components/Register";
import IssueBook from "./components/IssueBook";
import IssuedList from "./components/IssuedList";
import ReturnBook from "./components/ReturnBook";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/issuebook" element={<IssueBook />} />
          <Route path="/returnbook" element={<ReturnBook />} />
          <Route path="/issuedlist" element={<IssuedList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
