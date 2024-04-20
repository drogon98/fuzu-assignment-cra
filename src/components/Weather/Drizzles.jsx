import "./Weather.css";
import React from "react";

export default function Drizzles() {
  return (
    <div className="icon sun-shower">
      <div className="cloud"></div>
      <div className="sun">
        <div className="rays"></div>
      </div>
      <div className="rain"></div>
    </div>
  );
}
