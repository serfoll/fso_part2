/** @format */

import Country from "./Country";
import Notification from "./Notification";

const FilteredCountries = ({ countries, filter, setCountry }) => {
  const filteredCountries =
    filter.length === 0
      ? []
      : filter.length > 0
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter)
        )
      : countries;

  return filteredCountries.length !== 0 && filteredCountries.length <= 2 ? (
    setCountry(filteredCountries[0])
  ) : filteredCountries.length <= 10 ? (
    filteredCountries.map((country) => (
      <p key={country.name.common.toLowerCase()}>{country.name.common}</p>
    ))
  ) : (
    <Notification
      message={"Too many matches, please be more specific"}
      type={"warning"}
    />
  );
};

export default FilteredCountries;
