"use client";

import { useEffect, useState } from "react";
import { Category } from "../admin/category/page";
import { supabase } from "../supabaseClient";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ShoppingBasket, Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export interface Product {
  id: string;
  name: string;
  categoryName: string;
  description: string;
  price: number;
  active: boolean;
  images: string[];
}

const Products = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [likedProducts, setLikedProducts] = useState<{
    [productId: string]: boolean;
  }>({});
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    loadData();
    if (user) {
      loadLikedProducts(user.id);
    }
  }, [user]);
  // liked products
  async function loadLikedProducts(userId: string) {
    const { data } = await supabase
      .from("likedProducts")
      .select("productId")
      .eq("userId", userId);

    if (data) {
      const likesMap: { [productId: string]: boolean } = {};
      data.forEach((item) => {
        likesMap[item.productId] = true;
      });
      setLikedProducts(likesMap);
    }
  }
  // liked products

  // toggle Like
  async function toggleLike(userId: string, productId: string) {
    const isLiked = likedProducts[productId];

    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !isLiked,
    }));

    if (isLiked) {
      await supabase
        .from("likedProducts")
        .delete()
        .eq("userId", userId)
        .eq("productId", productId);
    } else {
      await supabase.from("likedProducts").insert([{ userId, productId }]);
    }
  }
  // toggle Like
  const loadData = async () => {
    setLoading(true);
    await Promise.all([getCategory(), getProducts()]);
    setLoading(false);
  };

  async function getCategory() {
    const { data } = await supabase.from("category").select("*");
    setCategory(data || []);
  }

  async function getProducts() {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  }

  const handleCategoryClick = (id: string) => {
    setActiveCategoryId(id);
  };

  const filteredProducts = activeCategoryId
    ? products.filter(
        (p) =>
          p.categoryName ===
          category.find((c) => c.id === activeCategoryId)?.name
      )
    : products;

  return (
    <div className="flex flex-col md:flex-row">
      {/* Category List */}
      <div className="p-6 bg-gray-100 md:w-1/4 w-full">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Categories</h3>
        <ul className="space-y-4 mt-4">
          {loading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <li key={idx}>
                  <Skeleton height={24} />
                </li>
              ))
            : category.map((itm) => {
                const count = products.filter(
                  (p) => p.categoryName === itm.name
                ).length;

                const isActive = activeCategoryId === itm.id;

                return (
                  <li
                    key={itm.id}
                    onClick={() => handleCategoryClick(itm.id)}
                    className={`flex justify-between items-center cursor-pointer px-2 py-1 rounded-md transition ${
                      isActive
                        ? "text-green-600 font-semibold"
                        : "text-gray-800 hover:text-green-600"
                    }`}
                  >
                    <span>{itm.name}</span>
                    <span
                      className={`text-sm ${
                        isActive ? "text-green-600 font-bold" : "text-gray-500"
                      }`}
                    >
                      ({count})
                    </span>
                  </li>
                );
              })}
        </ul>
      </div>

      {/* Product List */}
      <div className="p-6 md:w-3/4 w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="border rounded-lg shadow-md p-4 bg-white"
              >
                <Skeleton height={160} className="mb-3 rounded-md" />
                <Skeleton height={20} width="80%" className="mb-2" />
                <Skeleton height={16} width="40%" />
              </div>
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                key={product.id}
                className="relative border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition flex flex-col justify-between"
              >
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                ) : (
                  <Skeleton height={160} className="mb-3 rounded-md" />
                )}
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h4>
                <p className="text-green-600 text-md mb-4">${product.price}</p>

                {hoveredProductId === product.id && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-4 transition">
                    <button
                      onClick={() => {
                        if (!user) {
                          alert(
                            "Iltimos, ro‘yxatdan o‘ting yoki tizimga kiring."
                          );
                        } else {
                          router.push(`/products/${product.id}`);
                        }
                      }}
                      className="text-gray-600 hover:text-green-600"
                    >
                      <ShoppingBasket />
                    </button>
                    <button
                      onClick={() => {
                        if (!user) {
                          alert(
                            "Iltimos, ro‘yxatdan o‘ting yoki tizimga kiring."
                          );
                        } else {
                          toggleLike(user.id, product.id);
                        }
                      }}
                      className={`transition-colors duration-200 ${
                        likedProducts[product.id]
                          ? "text-red-500"
                          : "text-gray-600 hover:text-red-500"
                      }`}
                    >
                      <Heart
                        fill={likedProducts[product.id] ? "#ef4444" : "none"}
                        className={`transition-colors duration-200 ${
                          likedProducts[product.id]
                            ? "text-red-500"
                            : "text-gray-600 hover:text-red-500"
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Hozircha bu categoryda mahsulot mavjud emas)</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
