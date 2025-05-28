/** @format */
import helpers from "../utils/helpers";

const Country = ({ country, onHideCountry }) => {
  const { temp, weather, wind } = country.weatherData;
  console.log(wind);
  return (
    <div>
      <h1>
        {country?.name.common}{" "}
        <button onClick={() => onHideCountry()}>Hide</button>
      </h1>
      <section>
        {country?.area ? (
          <p>
            <b>Area: </b>
            {country?.area}
          </p>
        ) : null}
        {country?.capital ? (
          <p>
            <b>Capital: </b>
            {country?.capital.map((c) => c)}
          </p>
        ) : null}
        {country?.currencies ? (
          <p>
            <b>Currencies: </b>
            {Object.values(country?.currencies).map((currency) => (
              <span key={currency.name}>
                {currency.name} (<b>{currency.symbol}</b>)
              </span>
            ))}
          </p>
        ) : null}
        {country?.population ? (
          <p>
            <b>Population: </b>
            {country?.population}
          </p>
        ) : null}
        {country?.region ? (
          <p>
            <b>Region: </b>
            {country?.region}
          </p>
        ) : null}
        {country?.subregion ? (
          <p>
            <b>Sub Region: </b>
            {country?.subregion}
          </p>
        ) : null}
        {country?.timezones ? (
          <p>
            <b>Timezones: </b>
            {country?.timezones.map((zone, i) =>
              i !== country?.timezones.length - 1 ? zone + ", " : zone
            )}
          </p>
        ) : null}
      </section>

      {country?.languages ? (
        <section>
          <h2>Languages</h2>
          <ul>
            {Object.values(country?.languages).map((lang) => (
              <li key={lang.toLowerCase()}>{lang}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {country?.flags ? (
        <section>
          <img src={country?.flags.png} alt={country?.flags.alt} />
        </section>
      ) : null}
      {country?.capital && weather ? (
        <section>
          <h3>Weather in {country?.capital[0]}</h3>
          <p>
            <b>Temprature: </b> {temp?.temp}°C /{" "}
            {helpers.celcToFahr(temp?.temp).toFixed(2)}°F
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`}
            alt="weather icon"
          />
          <p>
            <b>Wind: </b>
            {wind?.speed} m/s / {helpers.mpsToMph(wind.speed).toFixed(2)} mph
          </p>
        </section>
      ) : null}
    </div>
  );
};

export default Country;
