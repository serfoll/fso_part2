/** @format */
import { useEffect, useState } from "react";
import countriesService from "./services/countries";

import Notification from "./components/Notification";
import Filter from "./components/Filter";
import FilteredCountries from "./components/FilteredCountries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("getting all countries");
    countriesService
      .getAll()
      .then((countriesData) => setCountries(countriesData));
  }, []);

  return (
    <div>
      <Filter filter={filter} onFilter={setFilter} />
      <FilteredCountries countries={countries} filter={filter} />
    </div>
  );
}

export default App;
