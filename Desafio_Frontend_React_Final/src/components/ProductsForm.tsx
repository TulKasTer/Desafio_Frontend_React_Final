import { useState } from 'react';

import { Product } from 'my-types';

import { createProduct } from '../api/ProductAPI';


export default function ProductsForm(){
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    Nombre: "",
    Descripcion: "",
    Precio: 0,
    Cantidad: 0,
    supplierId: 1,
    categoryId: 1
  });

  const handleCreate = async () => {
    try {
      const created = await createProduct(newProduct);
      setProducts((prev) => [...prev, created]);
      setNewProduct({
        Nombre: "",
        Descripcion: "",
        Precio: 0,
        Cantidad: 0,
        supplierId: 1,
        categoryId: 1
      });
    } catch (error) {
      alert("Error al crear producto");
      console.error(error);
    }
  };

  return(
    <>
    <div className="bg-gray-100 px-6 py-4 mb-4 rounded">
      <h2 className="text-lg font-medium mb-4">Nuevo Producto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.Nombre}
          onChange={(e) => setNewProduct({ ...newProduct, Nombre: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newProduct.Descripcion}
          onChange={(e) => setNewProduct({ ...newProduct, Descripcion: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.Precio}
          onChange={(e) => setNewProduct({ ...newProduct, Precio: parseFloat(e.target.value) })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={newProduct.Cantidad}
          onChange={(e) => setNewProduct({ ...newProduct, Cantidad: parseInt(e.target.value, 10) })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="ID Proveedor"
          value={newProduct.supplierId}
          onChange={(e) => setNewProduct({ ...newProduct, supplierId: parseInt(e.target.value, 10) })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="ID Categoría"
          value={newProduct.categoryId}
          onChange={(e) => setNewProduct({ ...newProduct, categoryId: parseInt(e.target.value, 10) })}
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={async () => {await handleCreate(); window.location.reload()}}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Crear Producto
      </button>
    </div>
    </>
  )
}