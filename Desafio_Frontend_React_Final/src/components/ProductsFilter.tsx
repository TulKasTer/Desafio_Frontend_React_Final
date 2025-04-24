import { useState, useEffect } from "react";
import { Product} from "my-types";
import { getAllProducts } from "../api/ProductAPI";

interface Props{
    products: Product[];
    onFilter: (filtered: Product[]) => void;
}

export default function ProductsFilter({ products, onFilter }: Props) {
  const [product, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterNombre, setFilterNombre] = useState("");
  const [filterProveedor, setFilterProveedor] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  // Cargar productos al montar
  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  // Extraer opciones únicas de proveedores y categorías
  const proveedores = Array.from(new Set(products.map(p => p.supplierId))).filter(Boolean);
  const categorias = Array.from(new Set(products.map(p => p.categoryId))).filter(Boolean);

  const handleFilter = () => {
    const filtered = products.filter((product) => {
      const nombreMatch = product.Nombre.toLowerCase().includes(filterNombre.toLowerCase());
      const proveedorMatch = filterProveedor === "" || product.supplierId === Number(filterProveedor);
      const categoriaMatch = filtroCategoria === "" || product.categoryId === Number(filtroCategoria);
    return nombreMatch && proveedorMatch && categoriaMatch;
    });
    onFilter(filtered);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Filtrar Productos</h2>

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

        <div>
          <label className="block text-sm font-medium text-gray-700">Proveedor</label>
          <select
            value={filterProveedor}
            onChange={(e) => setFilterProveedor(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Todos</option>
            {proveedores.map((id) => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Todas</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleFilter}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}
