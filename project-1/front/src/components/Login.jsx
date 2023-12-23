import React from "react";
import { Formik, Form as FormikForm } from "formik";
import Input from "./common/formComponent/input";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = (fields, { resetForm }) => {
    console.log(fields, "fields");
  };
  return (
    <>
      <div className="login">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({}) => {
            return (
              <FormikForm>
                <Input
                  className={"inputBox"}
                  name={"email"}
                  placeholder={"Enter Email"}
                />
                <Input
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
