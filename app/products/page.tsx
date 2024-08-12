"use client";

import React, { useEffect, useState } from "react";
import TableComponent from "../component/TableComponent";
import Product from "../models/Product";
import DataForm from "../component/DataForm";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const products = await res.json();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <main className="py-8">
          <DataForm />
          <h1 className="text-2xl font-bold mb-4 text-black">Data Table</h1>
          {loading ? <p>Loading...</p> : <TableComponent products={products} />}
        </main>
      </div>
    </div>
  );
}
