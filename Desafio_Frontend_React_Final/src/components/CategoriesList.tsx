import { useState, useEffect } from "react";
import { Category } from "my-types";
import {
  getAllCategories,
  deleteCategories,
  updateCategories,
} from "../api/CategoryAPI.tsx";
import CategoriesFilter from "./CategoriesFilter.tsx";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedCategory, setEditedCategory] = useState<Partial<Category>>({});
  const [filteredCategory, setFilteredCategory] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategories().then((data: any) => {
      setCategories(data);
      setFilteredCategory(data);
    });
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Delete the category?");
    if (!confirmed) return;

    await deleteCategories(id);
    setCategories((prev) => prev.filter((categories) => categories.id !== id));
  };

  const startEditing = (categories: Category) => {
    setEditingId(categories.id);
    setEditedCategory({ ...categories });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (editingId === null) return;

    await updateCategories(editingId, editedCategory);

    setCategories((prev) =>
      prev.map((product) =>
        product.id === editingId ? { ...product, ...editedCategory } : product
      )
    );

    setEditingId(null);
    setEditedCategory({});
  };

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto ">
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6 w-auto ">
          <div className="bg-gray-100 px-6 py-4 text-lg font-semibold text-gray-800">
            All Categories
          </div>

          <div className="px-6 py-4">
            <div className="flex flex-wrap gap-4 items-end">
              <CategoriesFilter
                categories={categories}
                onFilter={setFilteredCategory}
              />
            </div>
          </div>

          <div className="px-6 py-4">
            <h2 className="text-lg font-medium mb-4">Results</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700 ">
                <thead className="bg-gray-100 text-xs uppercase font-medium text-gray-600 text-center">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Modify</th>
                    <th className="px-4 py-2">Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(filteredCategory) &&
                    filteredCategory.map((category) => (
                      <tr
                        key={category.id}
                        className="border-b hover:bg-gray-50 transition-colors text-center"
                      >
                        <td className="px-4 py-2">{category.id}</td>
                        <td className="px-4 py-2">
                          {editingId === category.id ? (
                            <input
                              name="Nombre"
                              value={editedCategory.Nombre ?? ""}
                              onChange={handleChange}
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            category.Nombre
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editingId === category.id ? (
                            <button
                              type="button"
                              onClick={async () => {
                                await handleSave();
                                window.location.reload();
                              }}
                              className="text-green-600 hover:text-green-800"
                            >
                              <CheckIcon className="h-6 w-6 text-Green-500" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => startEditing(category)}
                              className="text-yellow-600 hover:text-yellow-800"
                            >
                              <PencilSquareIcon className="h-6 w-6 text-yellow-400" />
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            type="button"
                            onClick={async () => {
                              await handleDelete(category.id);
                              window.location.reload();
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            {/* Icono eliminar */}
                            <TrashIcon className="h-6 w-6 text-Red-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>

                <tfoot>
                  <tr className="text-xs text-gray-500 uppercase text-center">
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Modify</th>
                    <th className="px-4 py-2">Delete</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

