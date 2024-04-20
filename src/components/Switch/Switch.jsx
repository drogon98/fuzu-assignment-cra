import { useContext, useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import "./Switch.css";
import React from "react";

export default function Switch() {
  const navigate = useNavigate();
  const [active, setActive] = useState("en");

  const { locale } = useContext(AppContext);

  useEffect(() => {
    if (locale) {
      setActive(locale);
    } else {
      setActive("en");
    }
  }, [locale]);

  const handleChangeLocale = (e, loc) => {
    e.preventDefault();
    setActive(loc);
    navigate({
      search: `${createSearchParams({
        locale: loc,
      })}`,
    });
  };

  return (
    <div className="wrapper">
      <button
        className={`${active === "en" ? "active-locale" : ""}`}
        onClick={(e) => handleChangeLocale(e, "en")}
      >
        ENG
      </button>{" "}
      |
      <button
        className={`${active === "ki" ? "active-locale" : ""}`}
        onClick={(e) => handleChangeLocale(e, "ki")}
      >
        SWA
      </button>
    </div>
  );
}
