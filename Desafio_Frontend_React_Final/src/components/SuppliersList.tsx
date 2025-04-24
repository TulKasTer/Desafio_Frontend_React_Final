import { useState, useEffect } from "react";
import { Supplier } from "my-types";
import {
  getAllSuppliers,
  deleteSupplier,
  updateSupplier,
} from "../api/SupplierAPI.tsx";
import SuppliersFilter from "./SuppliersFilter.tsx";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function SuppliersList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedSuppliers, setEditedSupplier] = useState<Partial<Supplier>>({});
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    getAllSuppliers().then((data: Supplier[]) => {
      setSuppliers(data);
      setFilteredSuppliers(data);
    });
  }, []);
  

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Delete the supplier?");
    if (!confirmed) return;

    await deleteSupplier(id);
    setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id));
  };

  const startEditing = (supplier: Supplier) => {
    setEditingId(supplier.id);
    setEditedSupplier({ ...supplier });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (editingId === null) return;

    await updateSupplier(editingId, editedSuppliers);

    setSuppliers((prev) =>
      prev.map((supplier) =>
        supplier.id === editingId
          ? { ...supplier, ...editedSuppliers }
          : supplier
      )
    );

    setEditingId(null);
    setEditedSupplier({});
  };

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="bg-gray-100 px-6 py-4 text-lg font-semibold text-gray-800">
            All Suppliers
          </div>

          <div className="px-6 py-4">
            <div className="flex flex-wrap gap-4 items-end">
              <SuppliersFilter
                suppliers={suppliers}
                onFilter={setFilteredSuppliers}
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
                    <th className="px-4 py-2">Contacto</th>
                    <th className="px-4 py-2">Telefono</th>
                    <th className="px-4 py-2">Correo</th>
                    <th className="px-4 py-2">Direccion</th>
                    <th className="px-4 py-2">Modify</th>
                    <th className="px-4 py-2">Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(filteredSuppliers) &&
                    filteredSuppliers.map((supplier) => (
                      <tr
                        key={supplier.id}
                        className="border-b hover:bg-gray-50 transition-colors text-center"
                      >
                        <td className="px-4 py-2">{supplier.id}</td>
                        <td className="px-4 py-2">
                          {editingId === supplier.id ? (
                            <input
                              name="Nombre"
                              value={editedSuppliers.Nombre ?? ""}
                              onChange={handleChange}
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            supplier.Nombre
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editingId === supplier.id ? (
                            <input
                              name="Contacto"
                              value={editedSuppliers.Contacto ?? ""}
                              onChange={handleChange}
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            supplier.Contacto
                          )}
                        </td>

                        <td className="px-4 py-2">
                          {editingId === supplier.id ? (
                            <input
                              name="Telefono"
                              value={editedSuppliers.Telefono ?? ""}
                              onChange={handleChange}
                              className="border rounded px-2 py-1 w-30"
                            />
                          ) : (
                            supplier.Telefono
                          )}
                        </td>

                        <td className="px-4 py-2">
                          {editingId === supplier.id ? (
                            <input
                              name="Correo"
                              value={editedSuppliers.Correo ?? ""}
                              onChange={handleChange}
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            supplier.Correo
                          )}
                        </td>

                        <td className="px-4 py-2">
                          {editingId === supplier.id ? (
                            <input
                              name="Direccion"
                              value={editedSuppliers.Direccion ?? ""}
                              onChange={handleChange}
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            supplier.Direccion
                          )}
                        </td>

                        <td className="px-4 py-2">
                          {editingId === supplier.id ? (
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
                              onClick={() => startEditing(supplier)}
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
                              await handleDelete(supplier.id);
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
                    <th className="px-4 py-2">Contacto</th>
                    <th className="px-4 py-2">Telefono</th>
                    <th className="px-4 py-2">Correo</th>
                    <th className="px-4 py-2">Direccion</th>
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
