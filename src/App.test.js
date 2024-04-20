import { act, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

export const mockWeatherData = {
  lat: -1.2921,
  lon: 36.8219,
  timezone: "Africa/Nairobi",
  timezone_offset: 10800,
  current: {
    dt: 1713644128,
    sunrise: 1713583743,
    sunset: 1713627222,
    temp: 17.71,
    feels_like: 18.15,
    pressure: 1021,
    humidity: 100,
    dew_point: 17.71,
    uvi: 0,
    clouds: 75,
    visibility: 10000,
    wind_speed: 1.54,
    wind_deg: 220,
    weather: [
      {
        id: 500,
        main: "Rain",
        description: "light rain",
        icon: "10n",
      },
    ],
    rain: {
      "1h": 0.68,
    },
  },
};

describe("App", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(mockWeatherData),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("shows loading state initially", async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const loading = await screen.findByText(/Loading/i);
    expect(loading).toBeInTheDocument();
  });
  test("renders current weather data", async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(await screen.findByText(/Current/i)).toBeInTheDocument();
  });

  test("renders with default locale en", async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(await screen.findByText(/Current/i)).toBeInTheDocument();
  });
});
