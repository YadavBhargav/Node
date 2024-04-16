import axios from "axios";
import authHeader from "../auth/AuthHeader";

const defaultBaseUrl = "http://127.0.0.1:5000/";

export const API = axios.create({
  baseURL: defaultBaseUrl,
  headers: {
    ...authHeader(),
  },
});

export const PublicAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? defaultBaseUrl,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": true,
    // 'Access-Control-Request-Private-Network': true,
    "Access-Control-Allow-Private-Network": true,
  },
});
