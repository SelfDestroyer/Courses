import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

export default function Nav() {
  return (
    <nav>
      <ul className="nav__list">
        <li>
          <a href="/persons" className="nav__link">
            Persons
          </a>
        </li>
        <li>
          <a href="/planets" className="nav__link">
            Planets
          </a>
        </li>
        <li>
          <a href="/films" className="nav__link">
            Films
          </a>
        </li>
        <li>
          <a href="/starships" className="nav__link">
            Starships
          </a>
        </li>
      </ul>
    </nav>
  );
}
