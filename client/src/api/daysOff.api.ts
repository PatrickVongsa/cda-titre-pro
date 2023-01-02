import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/days-off";

const instance = axios.create({
  baseURL: API_URL,
});

export const allDaysOffs = async () => {
  return (await instance.get("/"))?.data;
};

export const addOneDaysOff = async (newDaysOff: IDaysOff) => {
  return (await instance.post("/", newDaysOff))?.data;
};

export const updateOneDaysOff = async (updateDaysOff: IDaysOff) => {
  return (await instance.put(`/${updateDaysOff.id}`, updateDaysOff))?.data;
};

export const deleteOneDaysOff = async (deleteDaysOff: IDaysOff) => {
  return (await instance.delete(`/${deleteDaysOff.id}`))?.data;
};