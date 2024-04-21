import "@fontsource/poppins";
import "@fontsource/poppins/400-italic.css";
import "@fontsource/poppins/400.css";
import { useEffect, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import { useLocation } from "react-router-dom";
import "./App.css";
import { getWeatherData } from "./api/index";
import Pin from "./components/Pin/Pin";
import Switch from "./components/Switch/Switch";
import Temperature from "./components/Temperature/Temperature";
import WeatherIcon from "./components/Weather/WaetherIcon";
import WeatherMeta from "./components/Weather/WeatherMeta/WeatherMeta";
import { AppContext } from "./context";
import messages_en from "./locales/en.json";
import messages_ki from "./locales/ki.json";
import { Toaster, toast } from "sonner";

const messages = {
  en: messages_en,
  ki: messages_ki,
};

function App() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState();
  const [locale, setLocale] = useState("en");
  const location = useLocation();
  const [error, setError] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const tempLocale = searchParams.get("locale");

    if (tempLocale === "en" || tempLocale === "ki") {
      setLocale(tempLocale);
    } else {
      setLocale("en");
    }
  }, [location]);

  useEffect(() => {
    let controller;
    let intervalId;

    const getData = async () => {
      try {
        setError("");

        controller = new AbortController();

        const data = await getWeatherData(controller.signal);

        setWeather(data);

        setLoading(false);

        intervalId = setInterval(async () => {
          try {
            const data = await getWeatherData(controller.signal);

            setWeather(data);
          } catch (error) {
            if (error.message) {
              if (error.message.includes("Failed to fetch")) {
                toast.warning("You are offline!");
              } else {
                toast.warning("There is a glitch");
              }
            }

            if (intervalId) {
              clearInterval(intervalId);
            }
          }
        }, 600000);
      } catch (error) {
        if (error.message) {
          if (error.message.includes("Failed to fetch")) {
            setError("Offline");
            setLoading(false);
          } else {
            if (!error.message.includes("The user aborted a request.")) {
              setError("error");
              setLoading(false);
            }
          }
        }
      }
    };

    getData();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }

      if (controller) {
        controller.abort();
      }
    };
  }, []);

  return (
    <AppContext.Provider value={{ locale, weather }}>
      <IntlProvider
        locale={locale}
        messages={messages[locale]}
        defaultLocale={"en"}
      >
        <div className="main">
          {loading ? (
            <div className="loading-wrapper">
              <h6>Loading...</h6>
            </div>
          ) : (
            <>
              {error === "Offline" && (
                <div className="error-wrapper">
                  <h6>You are offline!</h6>
                </div>
              )}
              {error === "error" && (
                <div className="error-wrapper">
                  <div>
                    <h4>There is a glitch!</h4>
                    <ul>
                      <li>Try again later.</li>
                    </ul>
                  </div>
                </div>
              )}
              {!error && (
                <div className="content">
                  <Switch />
                  <div className="header">
                    <div className="current-location">
                      <h2 id="current">
                        <FormattedMessage id="app.current" />
                      </h2>
                      <div className="location">
                        <Pin /> <span id="nairobi">Nairobi</span>
                      </div>
                    </div>
                    <Temperature />
                  </div>

                  <div className="body">
                    <WeatherIcon />
                  </div>

                  <div className="footer">
                    <WeatherMeta intlId={"app.wind"} />
                    <WeatherMeta intlId={"app.cloudCover"} />
                    <WeatherMeta intlId={"app.humidity"} />
                    <WeatherMeta intlId={"app.pressure"} />
                  </div>
                </div>
              )}
            </>
          )}
          <Toaster />
        </div>
      </IntlProvider>
    </AppContext.Provider>
  );
}

export default App;
