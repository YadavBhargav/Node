import React, { useEffect, useState } from "react";
import productServices from "../../services/ProductServices/productServices";

const ProductList = () => {
  const [data, setData] = useState([]);

  const getProduct = () => {
    productServices
      .getProduct()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {});
  };

  const deletById = (value) => {
    console.log(value._id, "value");
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

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto">
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
                <>
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {items?.name}
                    </td>
                    <td className="px-6 py-4">{items?.price}</td>
                    <td className="px-6 py-4">{items?.category}</td>
                    <td className="px-6 py-4">
                      <span className="material-symbols-outlined">edit</span>
                      <button onClick={() => deletById(items)}>
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
