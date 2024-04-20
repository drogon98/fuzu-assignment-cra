import React from "react";
import "./Weather.css";

export default function ThunderStorm() {
  return (
    <div className="icon thunder-storm">
      <div className="cloud"></div>
      <div className="lightning">
        <div className="bolt"></div>
        <div className="bolt"></div>
      </div>
    </div>
  );
}
