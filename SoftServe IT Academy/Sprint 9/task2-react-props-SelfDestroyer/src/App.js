import React from "react";
import "./App.css";
import First from "./First";

export default function App() {
  const data = [
    "Animals",
    "Anime",
    "Anti-Malware",
    "Art Design",
    "Books",
    "Business",
    "Calendar",
    "Cloud Storage",
    "File Sharing",
    "Animals",
    "Continuous Integration",
    "Cryptocurrency",
  ];

  return (
    <div>
      Some data:
      <First list={data.map((el) => el.toLowerCase())} />
    </div>
  );
}
