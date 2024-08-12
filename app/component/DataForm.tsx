import React, { useState } from "react";
import Product from "../models/Product";

const DataForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const addData = () => {
    fetch(`/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFormData({
          name: "",
          description: "",
          price: "",
        });
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div>
      <form onSubmit={addData}>
        <div className="grid gap-6 mb-6 md:grid-cols-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Description"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Price"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-0.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-10"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DataForm;
