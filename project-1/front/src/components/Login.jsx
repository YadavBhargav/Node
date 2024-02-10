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
        if (response.data.name) {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="login">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validateOnMount={true}
        >
          {({ values }) => {
            return (
              <FormikForm>
                <Input
                  className={"inputBox"}
                  name={"email"}
                  placeholder={"Enter Email"}
                />
                <Input
                  type="password"
                  className={"inputBox"}
                  name={"password"}
                  placeholder={"Enter Password"}
                />
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
