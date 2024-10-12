import axios from "axios";

//server localhost"http://localhost:5000"
const LocalHost = "http://localhost:5000";
//const Deployment = "https://homespacebh.vercel.app";
export const API_BASE_URL = LocalHost;

const jwt = localStorage.getItem("jwt");
//creates an instance and sets jwt for auth used for protected routes
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  },
});
