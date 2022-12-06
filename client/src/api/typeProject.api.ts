import axios from "axios";

const PROSPECT_STATUS_URL = import.meta.env.VITE_API_URL + "/project-types";

const instance = axios.create({
  baseURL: PROSPECT_STATUS_URL,
});

export const allProjectType = async () => {
  return (await instance.get("/"))?.data;
};

export const addOneProjectType = async (newProjectType: IProjectType) => {
  console.log(newProjectType)
  return (await instance.post("/", newProjectType))?.data;
};