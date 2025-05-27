/** @format */

import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const req = axios.get(`${baseUrl}/all`);
  const data = req
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
  return data;
};

export default { getAll };
