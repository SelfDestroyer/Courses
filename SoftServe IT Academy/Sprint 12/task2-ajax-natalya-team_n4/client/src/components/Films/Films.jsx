import React, { useEffect, useState } from "react";
import Button from "../Button/Button.jsx";
import Card from "../Card/Card";
import { getData, getImg } from "../../services/sw-service.js";

export default function Films() {
  let [count, setCount] = useState(1);
  let [src, setSrc] = useState();
  let [err, setErr] = useState(false);
  let [title, setTitle] = useState();
  let [episodeId, setEpisodeId] = useState();
  let [openingCrawl, setOpeningCrawl] = useState();
  let [director, setDirector] = useState();
  let [producer, setProducer] = useState();

  const handlerClick = () => setCount((count += 1));
  useEffect(() => {
    getImg(count, "films")
      .then((res) => setSrc((src = res.config.url)))
      .catch(() => {
        setSrc("https://starwars-visualguide.com/assets/img/placeholder.jpg");
      });

    getData(count, "films")
      .then((res) => {
        setTitle(res.data.title);
        setEpisodeId(res.data.episode_id);
        setOpeningCrawl(res.data.opening_crawl);
        setDirector(res.data.director);
        setProducer(res.data.producer);
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
        films={true}
        title={title}
        episodeId={episodeId}
        openingCrawl={openingCrawl}
        director={director}
        producer={producer}
      />
      <Button parentFunc={handlerClick} />
    </div>
  );
}
