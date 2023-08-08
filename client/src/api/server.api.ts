import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/servers";

const instance = axios.create({
  baseURL: API_URL,
});

export const allServers = async () => {
  return (await instance.get("/"))?.data;
};

export const addOneServer = async (newServer: IServer) => {
  return (await instance.post("/", newServer))?.data;
};

export const updateOneServer = async (updateServer: IServer) => {
  return (await instance.put(`/${updateServer.id}`, updateServer))?.data;
};

export const deleteOneServer = async (deleteServer: IServer) => {
  return (await instance.delete(`/${deleteServer.id}`))?.data;
};