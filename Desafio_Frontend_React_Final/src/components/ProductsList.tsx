import { useState, useEffect } from "react";
import { Product } from "my-types";
import {
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "../api/ProductAPI.tsx";
import ProductsFilter from "./ProductsFilter.tsx";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then((data: any) => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Delete the product?");
    if (!confirmed) return;

    await deleteProduct(id);
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const startEditing = (products: Product) => {
    setEditingId(products.id);
    setEditedProduct({ ...products });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (editingId === null) return;

    await updateProduct(editingId, editedProduct);

    setProducts((prev) =>
      prev.map((product) =>
        product.id === editingId ? { ...product, ...editedProduct } : product
      )
    );

    setEditingId(null);
    setEditedProduct({});
  };

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="bg-gray-100 px-6 py-4 text-lg font-semibold text-gray-800">
            All Products
          </div>

          <div className="px-6 py-4">
            <div className="flex flex-wrap gap-4 items-end">
              <ProductsFilter
                products={products}
                onFilter={setFilteredProducts}
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
                    <th className="px-2 py-2"># categoria</th>
                    <th className="px-2 py-2"># proveedor</th>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Descripcion</th>
                    <th className="px-4 py-2">Precio</th>
                    <th className="px-4 py-2">Cantidad</th>
                    <th className="px-4 py-2">Modify</th>
                    <th className="px-4 py-2">Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(filteredProducts) &&
                    filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b hover:bg-gray-50 transition-colors text-center"
                      >
                        <td className="px-4 py-2">{product.id}</td>
                        <td className="px-2 py-2">{product.categoryId}</td>
                        <td className="px-2 py-2">{product.supplierId}</td>
                        <td className="px-4 py-2">
                          {editingId === product.id ? (
                            <input
                              name="Nombre"
                              value={editedProduct.Nombre ?? ""}
                              onChange={handleChange}
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            product.Nombre
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editingId === product.id ? (
                            <input
                              name="Descripcion"
                              value={editedProduct.Descripcion ?? ""}
                              onChange={handleChange}
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            product.Descripcion
                          )}
                        </td>

                        <td className="px-4 py-2">
                          {editingId === product.id ? (
                            <input
                              name="Precio"
                              value={editedProduct.Precio ?? ""}
                              onChange={handleChange}
                              className="border rounded px-2 py-1 max-w-20"
                            />
                          ) : (
                            product.Precio
                          )}
                        </td>

                        <td className="px-4 py-2">
                          {editingId === product.id ? (
                            <input
                              name="Cantidad"
                              value={editedProduct.Cantidad ?? ""}
                              onChange={handleChange}
                              className="border rounded px-2 py-1 max-w-18"
                            />
                          ) : (
                            product.Cantidad
                          )}
                        </td>

                        <td className="px-4 py-2">
                          {editingId === product.id ? (
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
                              onClick={() => startEditing(product)}
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
                              await handleDelete(product.id);
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
                    <th className="px-4 py-2"># categoria</th>
                    <th className="px-4 py-2"># proveedor</th>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Descripcion</th>
                    <th className="px-4 py-2">Precio</th>
                    <th className="px-4 py-2">Cantidad</th>
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
