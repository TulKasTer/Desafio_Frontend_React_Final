import React from "react";
import SideComp from "../components/SidebarComp"; 
import CategoryPieChart from "../components/CategoryPieChart"; 
import SuppliersPieChart from "../components/SuppliersPieChart"; 
import ProductQuantityBarChart from "../components/ProductQuantityBarChart"; 

export default function Inicio() {
  return (
    <>
      <div className="container flex flex-col h-screen">
        <SideComp />
        <main className="main-content flex flex-col sm:flex-row flex-grow p-3 mx-40 gap-6">
          <div className="content text-2xl font-bold w-full">

            <div className="flex flex-col sm:flex-row gap-6 justify-between w-full">
              <div className="flex-1 sm:max-w-[6000px] p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                <CategoryPieChart />
              </div>

              <div className="flex-1 sm:max-w-[6000px] p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                <SuppliersPieChart />
              </div>
            </div>

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
