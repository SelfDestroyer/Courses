import React from "react";
import "./App.css";

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
      <ul>
        {data.map((el, index) => (
          <li key={String.fromCharCode(index)}>{el}</li>
        ))}
      </ul>
    </div>
  );
}
