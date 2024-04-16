import { PublicAPI } from "../../api/api";

class LoginService {
  login(loginObj) {
    return PublicAPI.post("/login", loginObj);
  }
}

export default new LoginService();
