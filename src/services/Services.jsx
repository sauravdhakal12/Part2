import axios from "axios";

const baseUrl = "/api/persons";

const fetchAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updateInfo = (updatedDetail) => {
  return axios.put(`${baseUrl}/${updatedDetail.id}`, updatedDetail);
};

export { fetchAll, deletePerson, updateInfo };
