import React from "react";
import { Formik, Form as FormikForm } from "formik";
import Input from "../common/formComponent/input";
import * as Yup from "yup";
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.string().required("Price is required"),
    category: Yup.string().required("Ccategory is required"),
  });

  const onSubmit = (fields, { resetForm }) => {
    productServices
      .createProduct({ ...fields })
      .then((response) => {
        if (response) {
          console.log(response, "response");
          resetForm();
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
        validationSchema={validationSchema}
      >
        {({}) => {
          return (
            <div className="product">
              <FormikForm>
                <div className="py-2">
                  <Input
                    className={"w-56 m-2"}
                    placeholder="Enter Product Name"
                    name={"name"}
                  />
                  <Input
                    className={"w-56 m-2"}  
                    placeholder="Enter Product Price"
                    name={"price"}
                  />
                  <Input
                    className={"w-56 m-2"}  
                    placeholder="Enter Product Category"
                    name={"category"}
                  />
                </div>
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
