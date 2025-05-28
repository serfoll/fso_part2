/** @format */
import { useEffect, useState } from "react";
import countriesService from "./services/countries";
import weatherServices from "./services/weather";

import Filter from "./components/Filter";
import CountriesList from "./components/CountriesList";
import Country from "./components/Country";
import Notification from "./components/Notification";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [country, setCountry] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState(null);

  const onFilter = (input) => {
    const pattern = /[^a-zA-Z ]/;
    const newFilter = input;

    if (pattern.test(input)) return;

    // console.log("filter word:", newFilter.trim());
    setFilter(newFilter);

    if (newFilter !== "") filterCountries(newFilter);
    else if (newFilter === "") {
      onHideCountry();
      setFilteredCountries([]);
      setNotificationMsg(null);
    }
  };

  const filterCountries = (filter) => {
    // filter countries
    onHideCountry();
    if (filter.length > 0) {
      const filtered = countries.filter((country) => {
        const countryName = country?.name.common.toLowerCase();
        return countryName.includes(filter.toLowerCase());
      });

      if (filtered.length === 1) {
        const country = filtered[0];
        // console.log("should show ", country?.name.common);
        onShowCountry(country);
      }

      if (filtered.length === 0) {
        const notisMsg = {
          msg: `No countries match "${filter.trim()}"`,
          type: "error",
        };
        setNotificationMsg(notisMsg);
        return;
      }

      if (filtered.length > 11) {
        const notisMsg = {
          msg: "Too many matches, please be more specific",
          type: "warning",
        };
        setNotificationMsg(notisMsg);
      } else {
        setFilteredCountries(filtered);
        setNotificationMsg(null);
      }
    }
  };

  const onShowCountry = async (country) => {
    // console.log("show", country?.name.common);
    if (country?.capital) {
      const { main, weather, wind } = await onGetWeather(country);

      const weatherData = {
        temp: main,
        weather: weather,
        wind: wind,
      };
      const countryToShow = { ...country, weatherData };
      setCountry(countryToShow);
    } else setCountry(country);
  };

  const onHideCountry = () => {
    //console.log("hide country");
    setCountry(null);
  };

  const onGetWeather = async (country) => {
    if (!country?.capital) return null;
    // console.log(
    //   "getting weather for",
    //   country?.capital[0],
    //   "in",
    //   country?.name.common
    // );

    const weatherData = await weatherServices.getWeather(country?.capital[0]);

    //console.log("weatherData", weatherData);
    return weatherData;
  };

  useEffect(() => {
    // console.log("getting all countries");
    countriesService
      .getAll()
      .then((countriesData) => setCountries(countriesData));
  }, []);

  return (
    <div>
      <Filter filter={filter} onFilter={onFilter} />

      {country !== null ? (
        <Country country={country} onHideCountry={onHideCountry} />
      ) : notificationMsg !== null ? (
        <Notification
          message={notificationMsg.msg}
          type={notificationMsg.type}
        />
      ) : (
        <CountriesList
          countries={filteredCountries}
          onShowCountry={onShowCountry}
        />
      )}
    </div>
  );
}

export default App;
