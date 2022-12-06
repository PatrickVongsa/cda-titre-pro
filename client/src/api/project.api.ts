import axios from "axios";

const PROSPECT_STATUS_URL = import.meta.env.VITE_API_URL + "/projects";

const instance = axios.create({
  baseURL: PROSPECT_STATUS_URL,
});

export const allProjects = async () => {
  return (await instance.get("/"))?.data;
};

export const addOneProject = async (newProject: IProject) => {
  console.log(newProject)
  return (await instance.post("/", newProject))?.data;
};