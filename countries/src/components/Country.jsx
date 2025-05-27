/** @format */

const Country = ({ country }) => {
  const {
    name,
    area,
    capital,
    languages,
    flags,
    currencies,
    population,
    region,
    subregion,
    ...rest
  } = country;

  //console.log(JSON.stringify(rest, null, 2));

  return (
    <div>
      <h1>{name.common}</h1>
      <p>
        <b>Area: </b>
        {area}
      </p>
      <p>
        <b>Capital: </b>
        {capital[0]}
      </p>
      <p>
        <b>Currencies: </b>
        {Object.values(currencies).map((currency) => (
          <span key={currency.name}>
            {currency.name} (<b>{currency.symbol}</b>)
          </span>
        ))}
      </p>
      <p>
        <b>Population: </b>
        {population}
      </p>
      <p>
        <b>Region:</b> {region}
      </p>
      <p>
        <b>Sub Region:</b> {subregion}
      </p>

      <h2>Languages</h2>
      <ul>
        {Object.values(languages).map((lang) => (
          <li key={lang.toLowerCase()}>{lang}</li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
    </div>
  );
};

export default Country;
