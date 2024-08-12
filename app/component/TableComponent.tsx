"use client";

import React, { useState } from "react";
import Product from "../models/Product";

const TableComponent: React.FC<{ products: Product[] }> = ({ products }) => {
  const [productList, setProductList] = useState<Product[]>(products);

  const deleteProduct = (_id: string) => {
    fetch(`http://localhost:3000/api/products/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Update the state by filtering out the deleted product
        setProductList(productList.filter((product) => product._id !== _id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-black">
              {productList.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 text-black ">{product.name}</td>
                  <td className="px-6 py-4 ">{product.description}</td>
                  <td className="px-6 py-4 ">{product.price}</td>
                  <td className="px-6 py-4 ">
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
