export const getWeatherData = async (signal) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=-1.2920659&lon=36.8219462&exclude=minute,hourly,daily,alerts&units=metric&appid=${process.env.REACT_APP_OW_API_KEY}`,
    { signal }
  );

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }

  return await res.json();
};
