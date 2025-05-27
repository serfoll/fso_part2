/** @format */
import { useEffect, useState } from "react";
import countriesService from "./services/countries";

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

    console.log("filter word:", newFilter.trim());
    setFilter(newFilter);

    if (newFilter !== "") filterCountries(newFilter);
    else if (newFilter === "") {
      setCountry(null);
      setFilteredCountries([]);
      setNotificationMsg(null);
    }
  };

  const filterCountries = (filter) => {
    // filter countries
    setCountry(null);
    if (filter.length > 0) {
      const filtered = countries.filter((country) => {
        const countryName = country.name.common.toLowerCase();
        return countryName.includes(filter.toLowerCase());
      });

      if (filtered.length === 1) {
        console.log("should show ", filtered[0].name.common);
        setCountry(filtered[0]);
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

  const onShowCountry = (countryToShow) => {
    console.log("show", countryToShow.name.common);
    setCountry(countryToShow);
  };

  const onHideCountry = () => {
    console.log("hide country");
    setCountry(null);
  };

  useEffect(() => {
    console.log("getting all countries");
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
