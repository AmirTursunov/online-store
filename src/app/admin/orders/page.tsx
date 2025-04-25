"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/app/supabaseClient";

interface Product {
  id: string;
  name: string;
  price: string;
}

interface Order {
  id: string;
  fullName: string;
  lastName: string;
  phoneNumber: string;
  totalPrice: string;
  productids: string[];
  status: "open" | "inprogress" | "close";
  createdAt: string;
}

interface OrderWithProducts extends Order {
  products: Product[];
}

const statuses = ["open", "inprogress", "close"];

const AdminOrders = () => {
  const [orders, setOrders] = useState<OrderWithProducts[]>([]);
  const [draggedOrderId, setDraggedOrderId] = useState<string | null>(null);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    const { data: ordersData } = await supabase.from("order").select("*");
    if (!ordersData) return;

    const ordersWithProducts: OrderWithProducts[] = await Promise.all(
      ordersData.map(async (order: Order) => {
        const { data: productData } = await supabase
          .from("products")
          .select("id, name, price")
          .in("id", order.productids);

        return {
          ...order,
          products: productData || [],
        };
      })
    );

    setOrders(ordersWithProducts);
  }

  const handleDragStart = (id: string) => {
    setDraggedOrderId(id);
  };

  const handleDrop = async (status: string) => {
    if (!draggedOrderId) return;

    const updatedOrders = orders.map((order) =>
      order.id === draggedOrderId ? { ...order, status: status as any } : order
    );

    setOrders(updatedOrders);

    await supabase.from("order").update({ status }).eq("id", draggedOrderId);

    setDraggedOrderId(null);
  };

  return (
    <div className="d-flex justify-content-between gap-2">
      {statuses.map((status) => (
        <div
          key={status}
          className="border h-[700px] w-[400px] p-2 overflow-auto"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(status)}
        >
          <span className="text-center font-bold block mb-2 capitalize">
            {status}
          </span>

          {orders
            .filter((order) => order.status === status)
            .map((order) => (
              <div
                key={order.id}
                className="mb-3 border p-2 rounded bg-light"
                draggable
                onDragStart={() => handleDragStart(order.id)}
              >
                <h5>Order Id: {order.id}</h5>
                <p>
                  <strong>
                    {order.fullName} {order.lastName}
                  </strong>
                </p>
                <p>Phone: {order.phoneNumber}</p>
                <p>Products:</p>
                <ul>
                  {order.products.map((product) => (
                    <li key={product.id}>
                      {product.name} - ${product.price}
                    </li>
                  ))}
                </ul>
                <h6 className="d-flex align-items-center gap-2 mt-2">
                  Total:{" "}
                  <span className="badge bg-success">${order.totalPrice}</span>
                </h6>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
