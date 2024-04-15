export default function authHeader() {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      Authorixzation: "Bearer" + JSON.parse(token),
      Accept: "application/json",
    };
  } else {
    return "";
  }
}
