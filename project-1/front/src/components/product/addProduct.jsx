import React from "react";
import { Formik, Form as FormikForm } from "formik";
import Input from "../common/formComponent/input";
import productServices from "../../services/ProductServices/productServices";

const addProduct = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const initialValues = {
    name: "",
    price: "",
    category: "",
    userId: user?._id,
    companyId: "1",
  };

  const onSubmit = (fields) => {
    productServices
      .createProduct({ ...fields })
      .then((response) => {
        if (response) {
          console.log(response, "response");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({}) => {
          return (
            <div className="product">
              <FormikForm>
                <Input
                  className={"inputBox"}
                  placeholder="Enter Product Name"
                  name={"name"}
                />
                <Input
                  className={"inputBox"}
                  placeholder="Enter Product Price"
                  name={"price"}
                />
                <Input
                  className={"inputBox"}
                  placeholder="Enter Product Category"
                  name={"category"}
                />
                {/* <Input name={"companyId"} /> */}

                <button className="appButton" type="submit">
                  Save
                </button>
              </FormikForm>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default addProduct;
