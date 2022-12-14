import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/project-types";

const instance = axios.create({
  baseURL: API_URL,
});

export const allProjectType = async () => {
  return (await instance.get("/"))?.data;
};

export const addOneProjectType = async (newProjectType: IProjectType) => {
  return (await instance.post("/", newProjectType))?.data;
};