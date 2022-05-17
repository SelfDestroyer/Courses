import React, { useState } from "react";

import "./App.css";

export default function App() {
  const [text, handleClick] = useState("React Marathon");

  return (
    <div onClick={() => handleClick(text.toLocaleLowerCase())}>{text}</div>
  );
}
