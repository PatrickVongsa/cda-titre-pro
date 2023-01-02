import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/days-off-status";

const instance = axios.create({
  baseURL: API_URL,
});

export const allDaysOffStatus = async () => {
  return (await instance.get("/"))?.data;
};

export const addOneDaysOffStatus = async (newDaysOffStatus: IDaysOffStatus) => {
  return (await instance.post("/", newDaysOffStatus))?.data;
};