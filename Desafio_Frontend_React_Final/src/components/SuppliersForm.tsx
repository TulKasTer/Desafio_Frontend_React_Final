import { useState } from 'react';

import { Supplier } from 'my-types';

import { createSupplier } from '../api/SupplierAPI';


export default function SuppliersForm(){
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [newSupplier, setNewSupplier] = useState<Omit<Supplier, "id">>({
    Nombre: "",
    Contacto: "",
    Telefono: "",
    Correo: "",
    Direccion: ""
  });

  const handleCreate = async () => {
    try {
      const created = await createSupplier(newSupplier);
      setSuppliers((prev) => [...prev, created]);
      setNewSupplier({
        Nombre: "",
        Contacto: "",
        Telefono: "",
        Correo: "",
        Direccion: ""
      });
    } catch (error) {
      alert("Error al crear proveedor");
      console.error(error);
    }
  };

  return(
    <>
    <div className="bg-gray-100 px-6 py-4 mb-4 rounded">
      <h2 className="text-lg font-medium mb-4">Nuevo Proveedor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={newSupplier.Nombre}
          onChange={(e) => setNewSupplier({ ...newSupplier, Nombre: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Contacto"
          value={newSupplier.Contacto}
          onChange={(e) => setNewSupplier({ ...newSupplier, Contacto: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Telefono"
          value={newSupplier.Telefono}
          onChange={(e) => setNewSupplier({ ...newSupplier, Telefono: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Correo"
          value={newSupplier.Correo}
          onChange={(e) => setNewSupplier({ ...newSupplier, Correo: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Direccion"
          value={newSupplier.Direccion}
          onChange={(e) => setNewSupplier({ ...newSupplier, Direccion: e.target.value })}
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