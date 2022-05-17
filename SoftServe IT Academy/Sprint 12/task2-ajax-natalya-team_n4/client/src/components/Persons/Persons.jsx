import React, { useEffect, useState } from "react";
import Button from "../Button/Button.jsx";
import Card from "../Card/Card";
import { getData, getImg } from "../../services/sw-service.js";

export default function Persons() {
  let [count, setCount] = useState(1);
  let [name, setName] = useState();
  let [gender, setGender] = useState();
  let [birthDay, setBirthDay] = useState();
  let [skinColor, setSkinColor] = useState();
  let [hairColor, sethairColor] = useState();
  let [height, setHeight] = useState();
  let [eyeColor, setEyeColor] = useState();
  let [src, setSrc] = useState();
  let [err, setErr] = useState(false);

  const handlerClick = () => setCount((count += 1));
  useEffect(() => {
    getImg(count, "characters")
      .then((res) => setSrc((src = res.config.url)))
      .catch(() => {
        setSrc("https://starwars-visualguide.com/assets/img/placeholder.jpg");
      });

    getData(count, "people")
      .then((res) => {
        setErr(false);
        setName(res.data.name);
        setGender(res.data.gender);
        setBirthDay(res.data.birth_year);
        setSkinColor(res.data.skin_color);
        sethairColor(res.data.hair_color);
        setHeight(res.data.height);
        setEyeColor(res.data.eye_color);
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
        name={name}
        gender={gender}
        heigth={height}
        eyeColor={eyeColor}
        skinColor={skinColor}
        birthDay={birthDay}
        hairColor={hairColor}
        err={err}
        personInfo={true}
      />
      <Button parentFunc={handlerClick} />
    </div>
  );
}
