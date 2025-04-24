"use client";
import React, { useEffect, useState } from "react";
import CategoryModal from "./CategoryModal";
import { supabase } from "@/app/supabaseClient";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export interface Category {
  id: string;
  name: string;
  description: string;
  active: boolean;
}
import { Edit2, Trash2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const AdminCategories = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    getCategory();
  }, []);
  async function getCategory() {
    setLoading(true);
    const { data } = await supabase.from("category").select("*");
    setCategory(data!);
    setLoading(false);
  }
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  async function deleteCategory(id: string) {
    const { data } = await supabase.from("category").delete().eq("id", id);
    getCategory();
  }
  const filteredCategories = category.filter((itm) =>
    itm.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  function editCategory(category: Category) {
    setSelectedCategory(category);
    openModal();
  }
  return (
    <div>
      <h3>Categories</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "end",
        }}
      >
        <input
          value={searchValue}
          type="text"
          className="form-control mb-2 w-25 mt-5"
          placeholder="Search by name..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={openModal} className="btn btn-primary mb-2">
          +Add New
        </button>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          closeModal();
          setSelectedCategory(null);
        }}
        refreshCategories={getCategory}
        category={selectedCategory}
      />
      <div>
        <table className="table mt-4 border">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? [...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td>
                      <Skeleton width={30} />
                    </td>
                    <td>
                      <Skeleton width={100} />
                    </td>
                    <td>
                      <Skeleton width={150} />
                    </td>
                    <td>
                      <Skeleton width={80} />
                    </td>
                    <td>
                      <Skeleton width={120} height={30} />
                    </td>
                  </tr>
                ))
              : filteredCategories.map((itm) => (
                  <tr key={itm.id}>
                    <td>{itm.id}</td>
                    <td>{itm.name}</td>
                    <td>{itm.description}</td>
                    <td>
                      {itm.active ? (
                        <span className="badge bg-success">Published</span>
                      ) : (
                        <span className="badge bg-danger">Draft</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => editCategory(itm)}
                        className="btn btn-warning"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => deleteCategory(itm.id)}
                        className="btn btn-danger mx-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategories;
