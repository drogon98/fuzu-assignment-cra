import { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { AppContext } from "../../../context";
import React from "react";
import "./WeatherMeta.css";

export default function WeatherMeta({ intlId }) {
  const [value, setValue] = useState("");
  const { weather } = useContext(AppContext);

  useEffect(() => {
    if (Object.keys(weather?.current ?? {}).length) {
      if (intlId === "app.wind") {
        setValue(`${weather?.current.wind_speed} m/s`);
      } else if (intlId === "app.cloudCover") {
        setValue(`${weather?.current.clouds}%`);
      } else if (intlId === "app.humidity") {
        setValue(`${weather?.current.humidity}%`);
      } else if (intlId === "app.pressure") {
        setValue(`${weather?.current.pressure.toLocaleString()} hPa`);
      }
    } else {
      setValue("--");
    }
  }, [intlId, weather]);

  return (
    <div>
      <p className="title">
        <b>
          <FormattedMessage id={intlId} />
        </b>
      </p>
      <p className="value">{value}</p>
    </div>
  );
}
