import { useContext } from "react";
import { AppContext } from "../../context";
import "./Temperature.css";

export default function Temperature() {
  const { weather } = useContext(AppContext);
  return (
    <h1 id="temperature">
      {weather?.current.temp ? weather?.current.temp : "--"} &deg;
    </h1>
  );
}
