import React, { useEffect, useState } from "react";
import Button from "../Button/Button.jsx";
import Card from "../Card/Card";
import { getData, getImg } from "../../services/sw-service.js";

export default function Planets() {
  let [count, setCount] = useState(1);
  let [src, setSrc] = useState();
  let [err, setErr] = useState(false);
  let [name, setName] = useState();
  let [population, setPopulation] = useState();
  let [climate, setClimate] = useState();
  let [gravity, setGravity] = useState();
  let [terrain, setTerrain] = useState();
  let [orbitalPeriod, setOrbitalPeriod] = useState();

  const handlerClick = () => setCount((count += 1));
  useEffect(() => {
    getImg(count, "planets")
      .then((res) => setSrc((src = res.config.url)))
      .catch(() => {
        setSrc("https://starwars-visualguide.com/assets/img/placeholder.jpg");
      });

    getData(count, "planets")
      .then((res) => {
        setName(res.data.name);
        setPopulation(res.data.population);
        setClimate(res.data.climate);
        setTerrain(res.data.rotation_period);
        setGravity(res.data.gravity);
        setTerrain(res.data.terrain);
        setOrbitalPeriod(res.data.orbital_period);

        setErr(false);
      })
      .catch(() => {
        setErr(true);
      });
  }, [count]);

  return (
    <div>
      <Card
        src={src}
        parentFunc={handlerClick}
        err={err}
        name={name}
        population={population}
        climate={climate}
        gravity={gravity}
        terrain={terrain}
        orbitalPeriod={orbitalPeriod}
        planetInfo={true}
      />
      <Button parentFunc={handlerClick} />
    </div>
  );
}
