import SidebarComp from "../components/SidebarComp";
import CategoriesForm from "../components/CategoriesForm";
import CategoriesList from "../components/CategoriesList";
import CategoryPieChart from "../components/CategoryPieChart";

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen">
      <SidebarComp />
      <main className="main-content flex is-flex-direction-row is-flex-grow-1 p-8 mx-40 flex flex-col flex-grow space-y-4">
        <CategoriesForm />
        <CategoriesList />
        <CategoryPieChart />
      </main>
    </div>
  )
}
