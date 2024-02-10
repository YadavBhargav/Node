import React from "react";
import { Formik, Form as FormikForm } from "formik";
import Input from "../common/formComponent/input";

const addProduct = () => {
  const initialValues = {
    name: "",
    price: "",
    category: "",
    userId: "",
    companyId: "",
  };

  const onSubmit = () => {};
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ values }) => {
          return (
            <FormikForm>
              <Input placeholder="Enter Product Name" name={"name"} />
              <Input placeholder="Enter Product Price" name={"price"} />
              <Input placeholder="Enter Product Category" name={"category"} />
              {/* <Input name={"companyId"} /> */}

              <button type="submit">Save</button>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default addProduct;
