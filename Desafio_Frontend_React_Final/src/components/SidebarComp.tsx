import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems
} from "flowbite-react";
import {
  HiShoppingBag,
  HiUser,
  HiViewBoards
} from "react-icons/hi";

export default function SidebarComp() {
  return (
    <>
      <Sidebar aria-label="Sidebar with logo branding example" className="bg-black text-white fixed top-0 left-0 h-screen w-40">
        <div className="flex justify-center items-center py-6">
          <a href="/">
            <img src="/public/logo.png" alt="InventarioAPP Logo" className="w-24 h-auto" />
          </a>
        </div>

        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem href="/products" icon={HiShoppingBag} className="text-white">
              Productos
            </SidebarItem>
            <SidebarItem href="/suppliers" icon={HiUser} className="text-white">
              Proveedores
            </SidebarItem >
            <SidebarItem href="/categories" icon={HiViewBoards} className="text-white">
              Categorias
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </>
  );
}
