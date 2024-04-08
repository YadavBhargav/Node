import React from "react";
import { Formik, Form as FormikForm } from "formik";
import Input from "../common/formComponent/input";
import * as Yup from "yup";
import productServices from "../../services/ProductServices/productServices";

const addProduct = ({ handleShowModal, setProductModel, getProduct }) => {
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
          resetForm();
          getProduct();
        }
        setProductModel(false);
      })
      .catch((error) => {
        console.log(error);
        setProductModel(false);
      });
  };
  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden fixed z-30 right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0">
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow  max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start p-5 rounded-t border-b  sticky top-0 left-0 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  {"Add Product"}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                  onClick={handleShowModal}
                >
                  <span className="material-icons-outlined">close</span>
                </button>
              </div>

              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                enableReinitialize={true}
                validationSchema={validationSchema}
              >
                {({}) => {
                  return (
                    <div className="p-6">
                      <FormikForm>
                        <div className="w-full mb-4 last:mb-0">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            {"Product Name"}

                            {/* <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span> */}
                          </label>
                          <Input name={"name"} />
                        </div>

                        <div className="w-full mb-4 last:mb-0">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            {"Price"}

                            {/* <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span> */}
                          </label>
                          <Input name={"price"} />
                        </div>
                        <div className="w-full mb-4 last:mb-0">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            {"Caegory"}

                            {/* <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span> */}
                          </label>
                          <Input name={"category"} />
                        </div>

                        <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 ">
                          <button
                            type="button"
                            className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                            onClick={handleShowModal}
                          >
                            Cancel
                          </button>

                          <button
                            type="submit"
                            className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md`}
                          >
                            Save
                          </button>
                        </div>
                      </FormikForm>
                    </div>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default addProduct;
