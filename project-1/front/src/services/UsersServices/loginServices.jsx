import { API } from "../../api/api";

class LoginService {
  login(loginObj) {
    return API.post("/login", loginObj);
  }
}

export default new LoginService();
