import { useState, useEffect } from "react";
import { Category } from "my-types";
import { getAllCategories } from "../api/CategoryAPI";

interface Props{
    categories: Category[];
    onFilter: (filtered: Category[]) => void;
}

export default function CategoriesFilter({ categories, onFilter }: Props) {
  const [category, setCategories] = useState<Category[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<Category[]>([]);
  const [filterNombre, setFilterNombre] = useState("");

  // Cargar productos al montar
  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data);
      setFilteredCategory(data);
    });
  }, []);

  const handleFilter = () => {
    const filtered = categories.filter((category) => {
      const nombreMatch = category.Nombre.toLowerCase().includes(filterNombre.toLowerCase());
    return nombreMatch;
    });
    onFilter(filtered);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Buscar Categoria</h2>

      <div className="grid grid-cols-1 md:grid-cols-6 ">
        <div>
          <label className="block text-sm font-medium text-gray-700 ">Nombre</label>
          <input
            type="text"
            value={filterNombre}
            onChange={(e) => setFilterNombre(e.target.value)}
            className="mt-1 block w-auto border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleFilter}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
