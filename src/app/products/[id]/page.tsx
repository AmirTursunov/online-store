"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { supabase } from "@/app/supabaseClient";
import Navbar from "@/app/navbar/page";
import { useUser } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingBasket } from "lucide-react";
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[] | null;
}

interface Cart {
  id: string;
  userId: string;
  productId: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [cartProducts, setCartProducts] = useState<Cart[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (id) {
      fetchProduct(id as string);
    }
  }, [id]);
  useEffect(() => {
    if (user?.id) {
      getCartProducts();
    }
  }, [user?.id]);
  const fetchProduct = async (productId: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (data) {
      setProduct(data);
      setSelectedImg(data.images?.[0] || null);
    }
  };

  const getCartProducts = async () => {
    if (!user?.id) return;
    const { data } = await supabase
      .from("korzina")
      .select("*")
      .eq("userId", user.id);

    if (data) {
      setCartProducts(data);
    }
  };

  const addToCard = async (productId: string, userId: string | undefined) => {
    if (!userId) {
      toast.error("Foydalanuvchi aniqlanmadi!");
      return;
    }

    const { error } = await supabase
      .from("korzina")
      .insert([{ productId, userId, quantity: 1 }]);

    if (error) {
      toast.error("Savatga qo‘shishda xatolik yuz berdi.");
    } else {
      toast.success("Mahsulot savatga qo‘shildi!");
      getCartProducts();
    }
  };

  if (!product) return <div>Loading...</div>;

  const isInCart = cartProducts.find((item) => {
    return item.productId == product.id;
  });

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 p-6 md:p-12 bg-white mt-3">
        {/* LEFT: Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={selectedImg || ""}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-lg mb-4"
          />

          <div className="flex gap-3 overflow-x-auto">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                  selectedImg === img
                    ? "border-green-500"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImg(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          <span className="text-gray-400">Name</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {product.name}
          </h1>
          <div>
            <span className="text-gray-400">Price</span>
            <p className="text-green-600 text-2xl font-semibold mb-4">
              ${product.price}
            </p>
          </div>
          <div>
            <span className="text-gray-400">Description</span>
            <p className="text-gray-800 leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          <div className="flex gap-4">
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
                onClick={() => addToCard(product.id, user?.id)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            )}
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
