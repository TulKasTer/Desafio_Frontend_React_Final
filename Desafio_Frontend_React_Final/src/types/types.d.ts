declare module "my-types"{
    
    export interface Product{
        id:number;
        Nombre:string;
        Descripcion: string;
        Precio: number;
        Cantidad: number;
        categoryId: number;
        supplierId: number;

    }

    export interface Supplier{
        id: number;
        Nombre: string;
        Contacto: string;
        Telefono: string;
        Correo: string;
        Direccion: string;
    }

    export interface Category{
        id: number;
        Nombre: string;
    }
}