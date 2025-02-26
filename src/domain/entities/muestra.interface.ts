import { Analisis } from "./analisis.interface";
import { Pedido } from "./pedido.interface";
import { Variedades } from "./variedades.interface";

export interface Muestra {
    id_muestra: string;
    nombre: number;
    fecha_registro: Date;
    peso: number;
    variedades_id_variedad: string;
    user_id_user: string;
    pedido_id_pedido: string;
    analisis: Analisis[];
    variedades: Variedades[];
    pedido: Pedido;
}