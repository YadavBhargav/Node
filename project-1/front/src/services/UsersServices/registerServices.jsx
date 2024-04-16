import { PublicAPI } from "../../api/api";

class RegisterService {
  signUp(userData) {
    return PublicAPI.post("/register", userData);
  }
}

export default new RegisterService();
