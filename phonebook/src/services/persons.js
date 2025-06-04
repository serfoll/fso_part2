/** @format */

import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const req = axios.get(baseUrl);

  const data = req
    .then((res) => res.data)
    .catch((err) => {
      console.error(`failed to get all persons, reason: ${err}`);
    });

  return data;
};

const create = (personObj) => {
  const req = axios.post(baseUrl, personObj);
  const data = req
    .then((res) => res.data)
    .catch((err) => {
      console.error(`failed to add ${personObj.name}. reason: ${err}`);
    });

  return data;
};

const deletePerson = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);

  const data = req
    .then((res) => res.data)
    .catch((err) => console.error(`failed to delete id ${id}, reason: ${err}`));

  return data;
};

const update = (id, personObj) => {
  console.log("should update", personObj.name, "with id:", id);
  const req = axios.put(`${baseUrl}/${id}`, personObj);
  const data = req
    .then((res) => res.data)
    .catch((err) =>
      console.error(`failed to update ${personObj.name}, reason: ${err}`)
    );

  return data;
};

export default { create, deletePerson, getAll, update };
