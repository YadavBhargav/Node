import React, { Fragment, useEffect, useState } from "react";
import productServices from "../../services/ProductServices/productServices";
import AddProduct from "./addProduct";
const ProductList = () => {
  const [data, setData] = useState([]);
  const [productModel, setProductModel] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const searchHandler = (e) => {
    let key = e.target.value;
    if (key) {
      productServices
        .searchProduct(key)
        .then((response) => {
          if (response) {
            setData(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getProduct();
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200">
          <div className="w-full">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Products..."
                onChange={searchHandler}
              />
            </div>
          </div>
          <button
            className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md`}
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
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {items?.name}
                    </td>
                    <td className="px-6 py-4">{items?.price}</td>
                    <td className="px-6 py-4">{items?.category}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setProductModel(true);
                          setEditId(items?._id);
                        }}
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
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

      {productModel && (
        <AddProduct
          setProductModel={setProductModel}
          handleShowModal={handleShowModal}
          getProduct={getProduct}
          id={editId}
          setEditId={setEditId}
        />
      )}
    </>
  );
};

export default ProductList;
