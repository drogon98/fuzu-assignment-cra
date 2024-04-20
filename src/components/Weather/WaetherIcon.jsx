import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import ThunderStorm from "./ThunderStorm";
import Drizzles from "./Drizzles";
import Rain from "./Rain";
import Sunny from "./Sunny";
import Cloudy from "./Cloudy";
import React from "react";

export default function WeatherIcon() {
  const [currentWether, setCurrentWeather] = useState();
  const { weather } = useContext(AppContext);

  useEffect(() => {
    if (weather?.current?.weather.length) {
      setCurrentWeather(weather?.current?.weather[0]);
    } else {
      setCurrentWeather(undefined);
    }
  }, [weather]);

  const renderWeatherIcon = useCallback(() => {
    const group = currentWether?.id ?? 0;
    if (group >= 200 && group < 300) {
      return <ThunderStorm />;
    } else if (group >= 300 && group < 400) {
      return <Drizzles />;
    } else if (group >= 500 && group < 600) {
      return <Rain />;
    } else if (800 === group) {
      return <Sunny />;
    } else if (group > 800 && group < 600) {
      return <Cloudy />;
    } else {
      return null;
    }
  }, [currentWether]);

  return <>{renderWeatherIcon()}</>;
}
