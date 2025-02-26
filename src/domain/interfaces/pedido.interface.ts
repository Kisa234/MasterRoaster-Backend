import { Lote } from "./lote.interface";
import { Muestra } from "./muestra.interface";
import { Tueste } from "./tueste.interface";
import { User } from "./user.interface";

export interface Pedido {
    id_pedido: string;
    fecha_pedido: Date;
    tipo_tueste: string;
    cantidad_tostado: number;
    estado_pedido: string;
    observaciones: string;
    user_id_user: string;
    lote?: Lote[];
    muestra?: Muestra[];
    user: User;
    tueste: Tueste[];
}