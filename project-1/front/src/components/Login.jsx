import React from "react";
import { Formik, Form as FormikForm } from "formik";
import Input from "./common/formComponent/input";
import loginServices from "../services/UsersServices/loginServices";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (fields, { resetForm }) => {
    loginServices
      .login({
        ...fields,
      })
      .then((response) => {
        if (response.data.auth) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", JSON.stringify(response.data.auth));
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <title>Login</title>
      <div className="login">
        <h1 className="font-semibold p-2 text-2xl">Login</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validateOnMount={true}
        >
          {({ values }) => {
            return (
              <FormikForm>
                <div className="gap-2">
                  <Input
                    className={"inputBox mb-2"}
                    name={"email"}
                    placeholder={"Enter Email"}
                  />
                  <Input
                    type="password"
                    className={"inputBox"}
                    name={"password"}
                    placeholder={"Enter Password"}
                  />
                </div>
                <button className="appButton" type="submit">
                  Login
                </button>
              </FormikForm>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default Login;
