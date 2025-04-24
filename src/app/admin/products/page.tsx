"use client";
import React, { useEffect, useState } from "react";
import ProductFormModal from "./ProductModal";
import { supabase } from "@/app/supabaseClient";
import { Edit2, Trash2 } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface Product {
  id: string;
  name: string;
  categoryName: string;
  description: string;
  price: number;
  active: boolean;
  images: string[];
}

const AdminProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    setLoading(true);
    const { data } = await supabase.from("products").select("*");
    setProduct(data || []);
    setLoading(false);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function editProduct(product: Product) {
    setEditedProduct(product);
    openModal();
  }
  async function deleteProduct(id: string) {
    await supabase.from("products").delete().eq("id", id);
    getProduct();
  }
  function searchProduct(value: string) {
    const filteredProducts = product.filter((itm) =>
      itm.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }
  return (
    <div>
      <h3>Products</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "end",
        }}
      >
        <input
          type="text"
          className="form-control mb-2 w-25 mt-5"
          placeholder="Search by name..."
          onChange={(e) => searchProduct(e.target.value)}
        />
        <button onClick={openModal} className="btn btn-primary mb-2">
          +Add New
        </button>
      </div>

      <ProductFormModal
        isModalOpen={isModalOpen}
        onClose={() => {
          closeModal();
          setEditedProduct(null);
        }}
        refreshProducts={getProduct}
        product={editedProduct}
      />

      <table className="table mt-5 border">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton width={40} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={200} />
                  </td>
                  <td>
                    <Skeleton width={80} />
                  </td>
                  <td>
                    <Skeleton width={90} />
                  </td>
                  <td>
                    <Skeleton width={80} height={30} />
                  </td>
                </tr>
              ))
            : (filteredProducts || product).map((itm) => (
                <tr key={itm.id}>
                  <td>{itm.id}</td>
                  <td>{itm.name}</td>
                  <td>{itm.categoryName}</td>
                  <td
                    style={{
                      maxWidth: "250px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {itm.description}
                  </td>
                  <td>{itm.price}</td>
                  <td>
                    {itm.active ? (
                      <span className="badge bg-success">Published</span>
                    ) : (
                      <span className="badge bg-danger">Draft</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => editProduct(itm)}
                      className="btn btn-warning"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => deleteProduct(itm.id)}
                      className="btn btn-danger mx-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
