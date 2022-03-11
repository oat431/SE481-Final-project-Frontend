import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL:"http://localhost:8080",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    headers: { "Access-Control-Allow-Origin": "*" },
  },
});
export default apiClient;
