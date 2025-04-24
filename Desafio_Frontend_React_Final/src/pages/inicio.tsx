// src/pages/inicio.tsx
import React from "react";
import SideComp from "../components/SidebarComp"; // Importación correcta
import CategoryPieChart from "../components/CategoryPieChart"; // Importación correcta
import SuppliersPieChart from "../components/SuppliersPieChart"; // Importación correcta
import ProductQuantityBarChart from "../components/ProductQuantityBarChart"; // Importación correcta

export default function Inicio() {
  return (
    <>
      <div className="container flex flex-col h-screen">
        <SideComp />
        <main className="main-content flex flex-col sm:flex-row flex-grow p-3 mx-40 gap-6">
          <div className="content text-2xl font-bold w-full">

            {/* Contenedor flex para alinear horizontalmente las gráficas */}
            <div className="flex flex-col sm:flex-row gap-6 justify-between w-full">
              
              {/* Contenedor para la gráfica de productos por categoría */}
              <div className="flex-1 sm:max-w-[3000px] p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                <CategoryPieChart />
              </div>

              {/* Contenedor para la gráfica de cantidad de cada producto */}
              <div className="flex-1 sm:max-w-[3000px] p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                <SuppliersPieChart />
              </div>
            </div>

            {/* Contenedor para la gráfica de productos por proveedor */}
            <div className="flex flex-col sm:flex-row w-full p-4 bg-white border border-gray-300 rounded-lg shadow-lg mt-6">
              <div className="w-full">
                <ProductQuantityBarChart />
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
