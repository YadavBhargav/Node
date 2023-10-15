import { API } from "../api/api";

class RegisterService {
  signUp(userData) {
    return API.post("/register",userData);
  }
}

export default new RegisterService();
