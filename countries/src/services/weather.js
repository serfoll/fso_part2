/** @format */
import axios from "axios";

const baseUrl = "https://api.openweathermap.org";
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const getWeather = (capital) => {
  const reqUrl = `${baseUrl}/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`;

  try {
    const req = axios.get(reqUrl);
    const weatherData = req.then((res) => res.data);
    return weatherData;
  } catch (error) {
    throw new Error(error);
  }
};

export default { getWeather };
