import React, { useState } from "react";
import { Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import "./App.css";
import Subtask1 from "./Components/Subtask1";
import Subtask2 from "./Components/Subtask2";
import Subtask3 from "./Components/Subtask3";
import Subtask4 from "./Components/Subtask4";

export default function App() {
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);

  const test = (e) => setNumber(e.target.value);

  const handleChange = (e) =>
    e.target.checked ? navigate("/subtask4") : navigate("/");

  return (
    <div className="App">
      <h1>React Marathon</h1>
      <h2>The topic 'Routes'</h2>
      <Link to={number % 2 !== 0 ? "/subtask3" : "/"} onClick={test}>
        Show protected information if
      </Link>
      <span>&nbsp;</span>
      <input size="5" onChange={test}></input> is odd
      <div className="mainClass">
        Go to the component programmatically, by checking the box:{" "}
        <input type="checkbox" onChange={handleChange}></input>
      </div>
      <Routes>
        <Route path="/subtask1/:id" element={<Subtask1 />} />
        <Route path="/subtask2" element={<Subtask2 />} />
        <Route path="/subtask3" element={<Subtask3 />} />
        <Route path="/subtask4" element={<Subtask4 />} />
      </Routes>
    </div>
  );
}
