import axios from "axios";

const defaultBaseUrl = "http://127.0.0.1:5000/";

export const API = axios.create({
  baseURL: defaultBaseUrl,
  headers: {
    Accept: "application/json",
  },
});
