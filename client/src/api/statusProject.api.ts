import axios from "axios";

const PROSPECT_STATUS_URL = import.meta.env.VITE_API_URL + "/project-status";

const instance = axios.create({
  baseURL: PROSPECT_STATUS_URL,
});

export const allProjectStatus = async () => {
  return (await instance.get("/"))?.data;
};

export const addOneProjectStatus = async (newProjectStatus: IProjectStatus) => {
  console.log(newProjectStatus)
  return (await instance.post("/", newProjectStatus))?.data;
};