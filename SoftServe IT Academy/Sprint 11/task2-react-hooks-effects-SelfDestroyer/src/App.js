import React, { useEffect, useRef } from "react";

import "./App.css";

export default function App() {
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.value = localStorage.getItem("appData");
  });

  return (
    <div>
      React Marathon, appData:{" "}
      <input
        size="5"
        onChange={(e) => {
          localStorage.setItem("appData", e.currentTarget.value);
        }}
        ref={textInput}
      ></input>
    </div>
  );
}
