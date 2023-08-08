import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/subdomains";

const instance = axios.create({
  baseURL: API_URL,
});

export const allSubdomains = async () => {
  return (await instance.get("/"))?.data;
};

export const addOneSubdomain = async (newSubdomain: ISubdomain) => {
  return (await instance.post("/", newSubdomain))?.data;
};

export const updateOneSubdomain = async (updateSubdomain: ISubdomain) => {
  return (await instance.put(`/${updateSubdomain.id}`, updateSubdomain))?.data;
};

export const deleteOneSubdomain = async (deleteSubdomain: ISubdomain) => {
  return (await instance.delete(`/${deleteSubdomain.id}`))?.data;
};