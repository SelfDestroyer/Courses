import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Subtask2() {
  let params = new useSearchParams(useLocation().search)[0]
    .toString()
    .replaceAll("&", ", ");
  return <div>Subtask2, query parameters: {params}</div>;
}
