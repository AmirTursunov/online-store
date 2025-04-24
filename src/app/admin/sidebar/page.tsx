"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Package,
  Users,
  ShoppingCart,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  { label: "Category", href: "/admin/category", icon: <Layers size={20} /> },
  { label: "Products", href: "/admin/products", icon: <Package size={20} /> },
  { label: "Users", href: "/admin/users", icon: <Users size={20} /> },
  { label: "Orders", href: "/admin/orders", icon: <ShoppingCart size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-gray-100 text-gray-800 p-6 border-r border-gray-200">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ color: "gray" }}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all text-decoration-none mt-3
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100 hover:text-blue-600"
                }`}
            >
              <span className={`${isActive ? "text-white" : "text-gray-600"}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
