"use client";
import { Ban, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

type User = {
  id: string;
  username?: string;
  lastName?: string;
  emailAddresses: { emailAddress: string }[];
  status?: "active" | "banned";
};

export default function AllUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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
        console.log(data);

        setUsers(
          data.users.map((user: User) => ({
            ...user,
            status: user.status ?? "active",
          }))
        );
      } catch (error) {
        console.error("Userlarni olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBan = (id: string) => {
    console.log("Ban user with ID:", id);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "banned" } : u))
    );
  };

  const handleActivate = (id: string) => {
    console.log("Activate user with ID:", id);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "active" } : u))
    );
  };

  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Foydalanuvchilar roʻyxati ({users.length} ta)
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Role</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">
                  {user.emailAddresses?.[0]?.emailAddress}
                </td>
                <td className="border px-4 py-2">
                  {user.emailAddresses?.[0]?.emailAddress ===
                  "amirtursunov2@gmail.com"
                    ? "admin"
                    : "user"}
                </td>
                <td className="border px-4 py-2">
                  {user.status === "banned" ? (
                    <span className="text-red-600 font-semibold">Banned</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Active</span>
                  )}
                </td>
                <td className="border px-4 py-2 space-x-2 d-flex align-items-center">
                  {user.status === "active" ? (
                    <button
                      onClick={() => handleBan(user.id)}
                      className="btn btn-danger d-flex align-items-center gap-1"
                    >
                      <Ban size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivate(user.id)}
                      className="btn btn-success d-flex align-items-center gap-1"
                    >
                      <CheckCircle size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
