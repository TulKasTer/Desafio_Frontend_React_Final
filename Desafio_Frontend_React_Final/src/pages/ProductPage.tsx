import SidebarComp from "../components/SidebarComp";
import ProductsForm from "../components/ProductsForm";
import ProductList from "../components/ProductsList";
import CategoryPieChart from "../components/CategoryPieChart";
import ProductQuantityBarChart from "../components/ProductQuantityBarChart"; // 👈 nuevo

export default function ProductPage() {
  return (
    <div className="flex min-h-screen">
      <SidebarComp />
      <main className="main-content flex is-flex-direction-row is-flex-grow-1 p-8 mx-40 flex flex-col flex-grow space-y-4">
        <ProductsForm />
        <ProductList />
        <CategoryPieChart />
        <ProductQuantityBarChart />
      </main>
    </div>
  )
}
