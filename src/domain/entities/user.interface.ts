import { Lote } from "./lote.interface";
import { Muestra } from "./muestra.interface";
import { Pedido } from "./pedido.interface";

export interface User {
    id_user: string;
    nombre: string;
    email: string;
    numero_telefono: number;
    rol: string;
    password: string;
    fecha_registro: Date;
    fecha_editado: Date;
    eliminado: boolean;
    lote: Lote[];
    muestra: Muestra[];
    pedido: Pedido[];
  }