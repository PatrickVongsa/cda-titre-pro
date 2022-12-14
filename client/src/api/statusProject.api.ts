import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/project-status";

const instance = axios.create({
  baseURL: API_URL,
});

export const allProjectStatus = async () => {
  return (await instance.get("/"))?.data;
};

export const addOneProjectStatus = async (newProjectStatus: IProjectStatus) => {
  return (await instance.post("/", newProjectStatus))?.data;
};