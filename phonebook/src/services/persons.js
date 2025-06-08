/** @format */

import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const req = axios.get(baseUrl);

  const data = req
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(`failed to get all persons: ${error}`);
    });

  return data;
};

const create = (personObj) => {
  const req = axios.post(baseUrl, personObj);
  const data = req
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });

  return data;
};

const deletePerson = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);

  const data = req
    .then((res) => res.status)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
  return data;
};

const update = (id, personObj) => {
  const req = axios.put(`${baseUrl}/${id}`, personObj);

  const data = req
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });

  return data;
};

export default { create, deletePerson, getAll, update };
