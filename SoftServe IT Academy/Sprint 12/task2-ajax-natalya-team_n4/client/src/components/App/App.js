import Nav from "../Nav/Nav.jsx";
import Persons from "../Persons/Persons.jsx";
import Planets from "../Planets/Planets.jsx";
import Starships from "../Starships/Starships.jsx";
import Films from "../Films/Films.jsx";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/planets" element={<Planets />} />
          <Route path="/persons" element={<Persons />} />
          <Route path="/starships" element={<Starships />} />
          <Route path="/films" element={<Films />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
