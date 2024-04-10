import React, { Fragment, useEffect, useState } from "react";
import productServices from "../../services/ProductServices/productServices";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 ">
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
