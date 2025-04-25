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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
