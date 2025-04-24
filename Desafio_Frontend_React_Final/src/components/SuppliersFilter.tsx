import { useState, useEffect } from "react";
import { Supplier } from "my-types";
import { getAllSuppliers} from "../api/SupplierAPI";

interface Props{
    suppliers : Supplier[];
    onFilter: (filtered: Supplier[]) => void;
}

export default function SuppliersFilter({ suppliers, onFilter }: Props) {
  const [supplier, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [filterNombre, setFilterNombre] = useState("");

  // Cargar productos al montar
  useEffect(() => {
    getAllSuppliers().then((data) => {
      setSuppliers(data);
      setFilteredSuppliers(data);
    });
  }, []);

  const handleFilter = () => {
    const filtered = suppliers.filter((supplier) => {
      const nombreMatch = supplier.Nombre.toLowerCase().includes(filterNombre.toLowerCase());
    return nombreMatch;
    });
    onFilter(filtered);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Buscar Proveedor</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={filterNombre}
            onChange={(e) => setFilterNombre(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
