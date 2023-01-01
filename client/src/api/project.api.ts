import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/projects";

const instance = axios.create({
  baseURL: API_URL,
});

export const allProjects = async () => {
  return (await instance.get("/"))?.data;
};

export const addOneProject = async (newProject: IProject) => {
  return (await instance.post("/", newProject))?.data;
};

export const updateOneProject = async (updateProject: IProject) => {
  return (await instance.put(`/${updateProject.id}`, updateProject))?.data;
};

export const deleteOneProject = async (deleteProject: IProject) => {
  return (await instance.delete(`/${deleteProject.id}`))?.data;
};