"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/page";
import { supabase } from "../supabaseClient";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "../footer/page";
import { useUser } from "@clerk/nextjs";
import { ShoppingBasket } from "lucide-react";
import { redirect } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Product {
  id: string;
  name: string;
  categoryName: string;
  description: string;
  price: number;
  active: boolean;
  images: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  active: boolean;
}
interface Cart {
  id: string;
  userId: string;
  productId: string;
}
const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState<Cart[]>([]);

  useEffect(() => {
    loadData();
    getCartProducts();
  }, []);
  const { user } = useUser();

  async function loadData() {
    setLoading(true);
    await Promise.all([getCategory(), getProducts()]);
    setLoading(false);
  }

  async function getProducts() {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  }

  async function getCategory() {
    const { data } = await supabase.from("category").select("*");
    setCategory(data || []);
  }

  const handleCategoryClick = (id: string) => {
    setActiveCategoryId(id);
    setSelectedProduct(null);
  };

  const handleMoreClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };
  async function getCartProducts() {
    const { data } = await supabase
      .from("korzina")
      .select("*")
      .eq("userId", user?.id);
    if (data) {
      setCartProducts(data);
    }
  }
  const filteredProducts = activeCategoryId
    ? products.filter(
        (p) =>
          p.categoryName ===
          category.find((c) => c.id === activeCategoryId)?.name
      )
    : products;
  async function addToCard(productId: string, userId: string | undefined) {
    const { error } = await supabase
      .from("korzina")
      .insert([{ productId, userId, quantity: 1 }]);
    if (error) {
      toast.error("Savatga qo‘shishda xatolik yuz berdi.");
    } else {
      toast.success("Mahsulot savatga qo‘shildi!");
      getCartProducts();
    }
  }
  const isInCart = cartProducts.find((item) => {
    return item.productId == selectedProduct?.id;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="hidden md:block w-full md:w-64 p-5 bg-gray-50 border-r min-h-screen">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Categories
          </h3>
          <ul className="px-2">
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <li key={idx}>
                    <Skeleton height={20} />
                  </li>
                ))
              : category.map((itm) => {
                  const isActive = activeCategoryId === itm.id;
                  return (
                    <li
                      key={itm.id}
                      onClick={() => handleCategoryClick(itm.id)}
                      className={`py-2 rounded-lg cursor-pointer transition-colors ${
                        isActive
                          ? "bg-green-100 text-green-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {itm.name}
                    </li>
                  );
                })}
          </ul>
        </div>

        <div className="md:hidden px-4 pt-4 overflow-x-auto">
          <div className="flex space-x-2">
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="w-28">
                    <Skeleton height={30} />
                  </div>
                ))
              : category.map((itm) => {
                  const isActive = activeCategoryId === itm.id;
                  return (
                    <button
                      key={itm.id}
                      onClick={() => handleCategoryClick(itm.id)}
                      className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-green-100 text-green-700 font-medium"
                          : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {itm.name}
                    </button>
                  );
                })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 bg-white">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="p-4 border rounded shadow-sm">
                  <Skeleton height={180} />
                  <Skeleton height={20} className="mt-4" />
                  <Skeleton height={20} width={100} />
                </div>
              ))}
            </div>
          ) : selectedProduct ? (
            <div className="max-w-4xl mx-auto">
              <button
                onClick={handleBackToProducts}
                className="mb-4 text-blue-600 hover:underline"
              >
                ← Back to Products
              </button>
              <div className="bg-white border rounded-lg shadow p-4 sm:p-6">
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <div className="flex space-x-2 overflow-x-auto mb-4">
                  {selectedProduct.images.slice(1).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-20 h-20 object-cover rounded cursor-pointer border hover:border-green-500"
                      onClick={() => {
                        const updatedImages = [...selectedProduct.images];
                        const clicked = updatedImages.splice(idx + 1, 1)[0];
                        updatedImages.unshift(clicked);
                        setSelectedProduct({
                          ...selectedProduct,
                          images: updatedImages,
                        });
                      }}
                    />
                  ))}
                </div>
                <h2 className="text-2xl font-bold mt-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-gray-600 mt-2">
                  {selectedProduct.description}
                </p>
                <p className="text-green-600 text-xl font-semibold mt-4">
                  ${selectedProduct.price}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  {isInCart ? (
                    <button
                      onClick={() => redirect("/cart")}
                      className="d-flex bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      <ShoppingBasket className="mx-1" />
                      Go to cart
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCard(selectedProduct.id, user?.id)}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-lg">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-lg shadow hover:shadow-md transition p-4"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h4 className="text-lg font-semibold mt-4">{product.name}</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {product.description.slice(0, 60)}...
                  </p>
                  <p className="text-green-600 font-bold mt-2">
                    ${product.price}
                  </p>
                  <div className="mt-3">
                    <button
                      onClick={() => handleMoreClick(product)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Shop;
