import axios from "axios";

const PROSPECT_STATUS_URL = import.meta.env.VITE_API_URL + "/prospect-status";

const instance = axios.create({
  baseURL: PROSPECT_STATUS_URL,
});

export const allProspectStatus = async () => {
  return (await instance.get("/"))?.data;
};

export const addOneProspectStatus = async (newProspectStatus: IProspectStatus) => {
  return (await instance.post("/", newProspectStatus))?.data;
};