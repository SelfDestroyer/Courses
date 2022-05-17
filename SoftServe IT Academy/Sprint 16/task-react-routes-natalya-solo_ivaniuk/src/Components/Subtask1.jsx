import React from "react";
import { useParams } from "react-router-dom";

export default function Subtask1() {
  const { id } = useParams();
  return <div>Subtask1, parameter: {id}</div>;
}
