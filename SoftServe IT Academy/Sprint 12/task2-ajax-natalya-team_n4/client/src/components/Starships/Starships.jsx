import React, { useEffect, useState } from "react";
import Button from "../Button/Button.jsx";
import Card from "../Card/Card";
import { getData, getImg } from "../../services/sw-service.js";

export default function Starships() {
  let [count, setCount] = useState(1);
  let [src, setSrc] = useState();
  let [err, setErr] = useState(false);
  let [name, setName] = useState();
  let [model, setModel] = useState();
  let [starshipClass, setStarshipClass] = useState();
  let [crew, setCrew] = useState();
  let [manufacturer, setManufacturer] = useState();
  let [length, setLength] = useState();
  let [costInCredits, setCostInCredits] = useState();

  const handlerClick = () => setCount((count += 1));
  useEffect(() => {
    getImg(count, "starships")
      .then((res) => setSrc((src = res.config.url)))
      .catch(() => {
        setSrc("https://starwars-visualguide.com/assets/img/placeholder.jpg");
      });

    getData(count, "starships")
      .then((res) => {
        setName(res.data.name);
        setModel(res.data.model);
        setStarshipClass(res.data.starship_class);
        setCrew(res.data.crew);
        setManufacturer(res.data.manufacturer);
        setLength(res.data.length);
        setCostInCredits(res.data.cost_in_credits);
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
        err={err}
        starshipInfo={true}
        name={name}
        model={model}
        crew={crew}
        manufacturer={manufacturer}
        length={length}
        costInCredits={costInCredits}
        starshipClass={starshipClass}
      />
      <Button parentFunc={handlerClick} />
    </div>
  );
}
