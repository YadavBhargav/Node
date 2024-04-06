import React, { Fragment, useEffect, useState } from "react";
import productServices from "../../services/ProductServices/productServices";
import { Link } from "react-router-dom";
import Input from "../common/formComponent/input";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [productModel, setProductModel] = useState(false);

  const getProduct = () => {
    productServices
      .getProduct()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {});
  };

  const deletById = (value) => {
    if (value._id) {
      productServices
        .deleteById(value._id)
        .then((response) => {
          console.log(response);
          getProduct();
        })
        .catch((error) => {});
    }
  };

  const handleShowModal = () => {
    setProductModel((prev) => !prev);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 ">
          <button
            className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
            onClick={handleShowModal}
          >
            Add product
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                category
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((items, index) => {
              return (
                <Fragment key={index}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {items?.name}
                    </td>
                    <td className="px-6 py-4">{items?.price}</td>
                    <td className="px-6 py-4">{items?.category}</td>
                    <td className="px-6 py-4">
                      <Link to={`/update/${items._id}`}>
                        <span className="material-symbols-outlined">edit</span>
                      </Link>
                      <button onClick={() => deletById(items)}>
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <AddPro
        setProductModel={setProductModel}
        handleShowModal={handleShowModal}
      />
    </>
  );
};

export default ProductList;

const AddPro = ({ setProductModel, handleShowModal }) => {
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
              <div className="p-6">
                <div className="w-full mb-4 last:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    {"Name"}

                    <span className="text-rose-500 text-2xl leading-none">
                      *
                    </span>
                  </label>
                  <input type={""} name="name" maxLength={500} />
                </div>
                <div className="w-full mb-4 last:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    {"Shipping Via"}

                    <span className="text-rose-500 text-2xl leading-none">
                      *
                    </span>
                  </label>
                  <input type={""} name="shippingVia" maxLength={500} />
                </div>
                <div className="w-full mb-4 last:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Charges
                    <span className="text-rose-500 text-2xl leading-none">
                      *
                    </span>
                  </label>
                  <input
                    type={"number"}
                    name="charges"
                    maxLength={20}
                    placeholder={"0.00"}
                    allowNegative={false}
                  />
                </div>
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
                  className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              for="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
};
