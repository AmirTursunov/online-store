"use client";
import { supabase } from "@/app/supabaseClient";
import React, { useEffect, useState } from "react";
import { Category } from "../category/page";
import { Product } from "./page";

interface ProductFormModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  refreshProducts: () => void;
  product?: Product | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isModalOpen,
  onClose,
  refreshProducts,
  product,
}) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [isActive, setIsActive] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  console.log(loading);

  useEffect(() => {
    getCategory();
    if (product) {
      setProductName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setIsActive(product.active);
      setImages(product.images);
      setCategoryValue(product.categoryName);
    }
  }, [product]);
  async function getCategory() {
    const { data } = await supabase.from("category").select("*");
    setCategory(data!);
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (files.length + images.length > 5) {
        setError("You can upload a maximum of 5 images.");
        return;
      }
      setError("");

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const newProduct = {
      name: productName,
      description,
      price,
      active: isActive,
      images,
      categoryName: categoryValue,
    };
    if (product) {
      await supabase
        .from("products")
        .update({
          name: productName,
          categoryName: categoryValue,
          description,
          images,
          price,
          active: isActive,
        })
        .eq("id", product.id);
    } else {
      await supabase.from("products").insert([newProduct]);
    }

    setProductName("");
    setDescription("");
    setPrice("");
    setIsActive(false);
    setCategoryValue("");
    setImages([]);
    refreshProducts();
    setLoading(false);

    onClose();
  }

  if (!isModalOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Product</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter product description"
                  rows={3}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Enter product price"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    onChange={(e) => setCategoryValue(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {category.map((itm) => {
                      return (
                        <option key={itm.id} value={itm.name}>
                          {itm.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="productActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="productActive">
                  Active
                </label>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Product Images (max 5)
                </label>

                <label
                  htmlFor="fileUpload"
                  className="border border-2 rounded-3 d-flex flex-column align-items-center justify-content-center p-4 text-muted"
                  style={{
                    cursor: "pointer",
                    minHeight: "150px",
                    background: "#f9f9f9",
                  }}
                >
                  <i className="bi bi-cloud-arrow-up fs-1 mb-2"></i>
                  <span>Click to upload or drag & drop images here</span>
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    className="d-none"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>

                {error && <div className="text-danger mt-2">{error}</div>}
              </div>

              {images.length > 0 && (
                <div className="row g-2">
                  {images.map((img, index) => (
                    <div className="col-4" key={index}>
                      <div>
                        <div style={{ position: "relative", zIndex: "0" }}>
                          <img
                            src={img}
                            alt={`Product ${index}`}
                            className="img-thumbnail "
                            style={{
                              width: "230px",
                              height: "150px",
                              objectFit: "cover",
                            }}
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-danger  m-1"
                            style={{
                              position: "absolute",
                              top: "-10px",
                              right: "10px",
                              zIndex: "99",
                            }}
                            onClick={() =>
                              setImages((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="modal-footer px-0 mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
