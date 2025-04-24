"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import { useUser } from "@clerk/nextjs";
import { supabase } from "../supabaseClient";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
  quantity: number;
}

interface Cart {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
}

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<Number>();
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState({
    fullname: "",
    lastName: "",
    city: "",
    phoneNumber: "",
  });
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  async function getCart() {
    setLoading(true);
    const { data: cartData } = await supabase
      .from("korzina")
      .select("*")
      .eq("userId", user?.id);

    setCart(cartData || []);

    if (cartData && cartData.length > 0) {
      const productIds = cartData.map((item) => item.productId);

      const { data: productData } = await supabase
        .from("products")
        .select("*")
        .in("id", productIds);

      setProducts(productData || []);
    }

    setLoading(false);
  }
  async function increaseProduct(cart: Cart) {
    await supabase
      .from("korzina")
      .update({ quantity: Number(cart.quantity) + 1 })
      .eq("id", cart.id);
    getCart();
  }
  async function decreaseProduct(cart: Cart) {
    if (cart.quantity > 1) {
      const newQuantity = cart.quantity - 1;
      const { data, error } = await supabase
        .from("korzina")
        .update({ quantity: newQuantity })
        .eq("id", cart.id);
    }
    getCart();
  }
  async function deleteProduct(id: string) {
    await supabase.from("korzina").delete().eq("id", id);
    getCart();
  }
  function sumTotal() {
    return cart.reduce((total, itm) => {
      const product = products.find((p) => p.id == itm.productId);
      if (!product) return total;
      return total + product?.price * itm.quantity;
    }, 0);
  }
  async function handleBuy(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.from("order").insert([
      {
        fullName: order.fullname,
        lastName: order.lastName,
        city: order.city,
        phoneNumber: order.phoneNumber,
        productids: cart.map((item) => item.productId),
        createdAt: new Date().toISOString(),
        totalPrice: sumTotal().toFixed(2),
        status: "open",
      },
    ]);
    if (error) {
      toast.error("Buyurtmani qabul qilishda xatolik yuz berdi.");
    } else {
      toast.success("Buyurtmangiz qabul qilindi!");
    }
    await supabase
      .from("korzina")
      .delete()
      .in(
        "id",
        cart.map((item) => item.id)
      );
    getCart();

    setOrder({ fullname: "", lastName: "", city: "", phoneNumber: "" });
    setIsOpen(false);
    setLoading(false);
  }
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm sm:text-base">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 whitespace-nowrap">Image</th>
                <th className="p-2 whitespace-nowrap">Product</th>
                <th className="p-2 whitespace-nowrap">Price</th>
                <th className="p-2 whitespace-nowrap">Quantity</th>
                <th className="p-2 whitespace-nowrap">Total</th>
                <th className="p-2 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 4 }).map((_, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">
                        <Skeleton width={64} height={64} />
                      </td>
                      <td className="p-2">
                        <Skeleton width={120} />
                      </td>
                      <td className="p-2">
                        <Skeleton width={60} />
                      </td>
                      <td className="p-2">
                        <Skeleton width={40} />
                      </td>
                      <td className="p-2">
                        <Skeleton width={70} />
                      </td>
                      <td className="p-2">
                        <Skeleton width={60} height={30} />
                      </td>
                    </tr>
                  ))
                : cart.map((item) => {
                    const product = products.find(
                      (p) => p.id == item.productId
                    );
                    if (!product) return null;

                    return (
                      <tr key={item.id} className="border-t">
                        <td className="p-2">
                          <img
                            src={product.images?.[0] || "/no-image.png"}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">${product.price.toFixed(2)}</td>
                        <td className="p-2 whitespace-nowrap">
                          <button
                            onClick={() => decreaseProduct(item)}
                            className="btn btn-warning mx-2"
                          >
                            -
                          </button>
                          {item.quantity}
                          <button
                            onClick={() => increaseProduct(item)}
                            className="btn btn-primary mx-2"
                          >
                            +
                          </button>
                        </td>
                        <td className="p-2">
                          ${(product.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => deleteProduct(item.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        {!loading && cart.length === 0 && (
          <p className="text-center mt-10 text-gray-500">Cart is empty</p>
        )}
      </div>
      <div className="text-right mt-4 text-xl font-bold mx-4 flex items-center justify-end gap-2">
        <span>Total: ${sumTotal().toFixed(2)}</span>
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-success mx-2"
        >
          Proceed To Checkout
        </button>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm animate-fadeIn">
              <h2 className="text-lg font-medium text-center mb-4">
                Checkout Order
              </h2>
              <span className="text-sm font-thin text-success">
                {cart.length} Products , Total : ${sumTotal().toFixed(2)}
              </span>
              <form
                onSubmit={(e) => handleBuy(e)}
                className="space-y-3 text-sm"
              >
                <div>
                  <label className="float-left block mb-1 font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    required
                    value={order.fullname}
                    onChange={(e) =>
                      setOrder({ ...order, fullname: e.target.value })
                    }
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="float-left block mb-1 font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    required
                    value={order.lastName}
                    onChange={(e) =>
                      setOrder({ ...order, lastName: e.target.value })
                    }
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="float-left block mb-1 font-medium text-gray-700">
                    City
                  </label>
                  <input
                    required
                    value={order.city}
                    onChange={(e) =>
                      setOrder({ ...order, city: e.target.value })
                    }
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="float-left block mb-1 font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    required
                    value={order.phoneNumber}
                    onChange={(e) =>
                      setOrder({ ...order, phoneNumber: e.target.value })
                    }
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-400 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  {loading ? (
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                      wait for a second...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                      Buy
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
