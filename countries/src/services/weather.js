/** @format */
import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5";

const getWeather = (lat, lon) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const reqUrl = `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  try {
    const req = axios.get(reqUrl);
    const weatherData = req.then((res) => res.data);
    return weatherData;
  } catch (error) {
    throw new Error(error);
  }
};

export default { getWeather };
