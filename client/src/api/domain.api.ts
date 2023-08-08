import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/domains";

const instance = axios.create({
  baseURL: API_URL,
});

export const allDomains = async () => {
  return (await instance.get("/"))?.data;
};

export const addOneDomain = async (newDomain: IDomain) => {
  return (await instance.post("/", newDomain))?.data;
};

export const updateOneDomain = async (updateDomain: IDomain) => {
  return (await instance.put(`/${updateDomain.id}`, updateDomain))?.data;
};

export const deleteOneDomain = async (deleteDomain: IDomain) => {
  return (await instance.delete(`/${deleteDomain.id}`))?.data;
};