/** @format */

const CountriesList = ({ countries }) => {
  return countries.map((country) => (
    <p key={country.name.common.toLowerCase()}>{country.name.common}</p>
  ));
};

export default CountriesList;
