import SideComp from "../components/SidebarComp"

export default function Inicio() {
    return (
        <>
            <div className = "container flex is-flex-direction-column is-fullheight">
                <SideComp />
                <main className = "main-content flex is-flex-direction-row is-flex-grow-1 p-3 mx-40 ">
                    <div className = "content text-2xl font-bold text-bold">
                        Hola, esto es el dashboard
                    </div>
                </main>
            </div>
        </>
    )

}