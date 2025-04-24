import { useState } from 'react';

import { Category } from 'my-types';

import { createCategories} from '../api/CategoryAPI';


export default function CategoriesForm(){
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({
    Nombre: ""
  });

  const handleCreate = async () => {
    try {
      const created = await createCategories(newCategory);
      setCategories((prev) => [...prev, created]);
      setNewCategory({
        Nombre: ""
      });
    } catch (error) {
      alert("Error al crear categoria");
      console.error(error);
    }
  };

  return(
    <>
    <div className="bg-gray-100 px-6 py-4 mb-4 rounded">
      <h2 className="text-lg font-medium mb-4">Nuevo Categoria</h2>
      <div className="w-full">
        <input
          type="text"
          placeholder="Nombre"
          value={newCategory.Nombre}
          onChange={(e) => setNewCategory({ ...newCategory, Nombre: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={async () => {await handleCreate(); window.location.reload()}}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Crear Categoria
      </button>
    </div>
    </>
  )
}