import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (auth && token) {
      navigate("/");
    } else {
      navigate("/login");
      localStorage.clear();
    }
  }, [auth, token]);

  return (
    <>
      <div>
        {auth && token ? (
          <ul className="nav-ul">
            <li>
              <Link to={"/"}>Products</Link>
            </li>
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link onClick={logout} to={"/login"}>
                Logout ({JSON.parse(auth)?.name})
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-ul nav-right">
            <li>
              <Link to={"/signup"}>Sign Up</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Nav;
