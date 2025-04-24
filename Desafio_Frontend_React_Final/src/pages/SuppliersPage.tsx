import SidebarComp from "../components/SidebarComp";
import SuppliersList from "../components/SuppliersList";
import SuppliersForm from "../components/SuppliersForm";

export default function SupplierPage(){
    return(
        <>
            <div className="flex min-h-screen">
                <SidebarComp />
                <main className="main-content is-flex-direction-row is-flex-grow-1 p-8 mx-40 flex flex-col flex-grow space-y-4">
                    <SuppliersForm />
                    <SuppliersList />
                </main>
            </div>
        </>
    );
}
