import { Usuario } from "./usuario";

export interface Producto {
    id:           string;
    nombre:       string;
    cantidad:     number;
    fechaIngreso: string;
    usuario:      Usuario;
    idUsuario:    string;
}