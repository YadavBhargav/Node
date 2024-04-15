import axios from "axios";
import authHeader from "../auth/AuthHeader";

const defaultBaseUrl = "http://127.0.0.1:5000/";

export const API = axios.create({
  baseURL: defaultBaseUrl,
  headers: {
    ...authHeader(),
  },
});
