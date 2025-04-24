import { supabase } from "@/app/supabaseClient";
import React, { useEffect, useState } from "react";
import { Category } from "./page";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshCategories: () => void;
  category?: Category | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  refreshCategories,
  category,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setCategoryDescription(category.description);
      setIsActive(category.active);
    }
  }, [category]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (category) {
      await supabase
        .from("category")
        .update({
          name: categoryName,
          description: categoryDescription,
          active: isActive,
        })
        .eq("id", category.id);
    } else {
      await supabase.from("category").insert([
        {
          name: categoryName,
          description: categoryDescription,
          active: isActive,
        },
      ]);
    }

    setCategoryName("");
    setCategoryDescription("");
    setIsActive(false);
    refreshCategories();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 z-10">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="categoryDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Category Description
            </label>
            <textarea
              id="categoryDescription"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Enter category description"
              rows={4}
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="active" className="text-sm text-gray-700">
              Active
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
