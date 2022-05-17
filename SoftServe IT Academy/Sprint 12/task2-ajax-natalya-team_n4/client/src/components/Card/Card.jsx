import React from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./Card.css";

export default function Card(props) {
  let info = null;

  if (props.planetInfo) {
    info = (
      <ul>
        <li>{`Population - ${props.population}`}</li>
        <li>{`Rotation period - ${props.rotationPerion}`}</li>
        <li>{`Orbital period - ${props.orbitalPeriod}`}</li>
        <li>{`Terrain - ${props.terrain}`}</li>
        <li>{`Gravity - ${props.gravity}`}</li>
        <li>{`Climate - ${props.climate}`}</li>
      </ul>
    );
  }

  if (props.personInfo) {
    info = (
      <ul>
        <li>{`Birthcay - ${props.birthDay}`}</li>
        <li>{`Eye color - ${props.eyeColor}`}</li>
        <li>{`Gender - ${props.gender}`}</li>
        <li>{`Hair color ${props.hairColor}`}</li>
        <li>{`Skin color - ${props.skinColor}`}</li>
        <li>{`Heigth - ${props.heigth}`}</li>
      </ul>
    );
  }

  if (props.starshipInfo) {
    info = (
      <ul>
        <li>{`Model - ${props.model}`}</li>
        <li>{`Starship class - ${props.starshipClass}`}</li>
        <li>{`Crew - ${props.crew}`}</li>
        <li>{`Manufacturer - ${props.manufacturer}`}</li>
        <li>{`Length - ${props.length}`}</li>
        <li>{`Cost in credits - ${props.costInCredits}`}</li>
      </ul>
    );
  }

  if (props.films) {
    info = (
      <ul style={{ width: "450px" }}>
        <li
          style={{ textAlign: "center" }}
        >{`Episode - ${props.episodeId}`}</li>
        <li style={{ textAlign: "justify" }}>{props.openingCrawl}</li>
        <li>{`Director - ${props.director}`}</li>
        <li>{`Producer - ${props.producer}`}</li>
      </ul>
    );
  }


  return props.err ? (
    <div className="card">
      <img src={props.src} alt="img" />
      <ErrorMessage />
    </div>
  ) : (
    <div className="card">
      <img src={props.src} alt="img" />
      <div className="info">
        <h3>{props.name || props.title}</h3>
        {info}
      </div>
    </div>
  );
}
