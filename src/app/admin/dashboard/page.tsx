"use client";
import { supabase } from "@/app/supabaseClient";
import { SignOutButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Category } from "../category/page";
import { Product } from "../products/page";
type User = {
  id: string;
  username?: string;
  lastName?: string;
  emailAddresses: { emailAddress: string }[];
  status?: "active" | "banned";
};
interface Order {
  id: string;
  fullName: string;
  lastName: string;
  city: string;
  phoneNumber: string;
  totalPrice: string;
  cartId: string;
  status: string;
  createdAt: string;
}
const AdminDashboard = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const [userCount, setUserCount] = useState<number | null>(null);
  const { user } = useUser();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/all-users");

        if (!res.ok) {
          const text = await res.text();
          console.error("Xatolik javobi:", text);
          return;
        }

        const data = await res.json();

        setUserCount(data.total);
      } catch (error) {
        console.error("Userlarni olishda xatolik:", error);
      }
    };

    fetchUsers();
  }, [user]);
  async function fetchData() {
    try {
      const [categoryRes, productsRes, ordersRes] = await Promise.all([
        supabase.from("category").select("*"),
        supabase.from("products").select("*"),
        supabase.from("order").select("*"),
      ]);

      setCategory(categoryRes.data || []);
      setProducts(productsRes.data || []);
      setOrders(ordersRes.data || []);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  }
  return (
    <div className="p-4">
      <div className="btn btn-warning">
        <SignOutButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 mt-4 ">
        <div className="bg-red-100 rounded-xl p-6 shadow text-center">
          <h3 className="text-lg font-bold">Categories</h3>
          <p className="text-2xl">{category.length}</p>
        </div>
        <div className="bg-yellow-100 rounded-xl p-6 shadow text-center">
          <h3 className="text-lg font-bold">Users</h3>
          <p className="text-2xl">{userCount ?? "..."}</p>
        </div>
        <div className="bg-green-100 rounded-xl p-6 shadow text-center">
          <h3 className="text-lg font-bold">Products</h3>
          <p className="text-2xl">{products.length}</p>
        </div>
        <div className="bg-blue-100 rounded-xl p-6 shadow text-center">
          <h3 className="text-lg font-bold">Orders</h3>
          <p className="text-2xl">{orders.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
