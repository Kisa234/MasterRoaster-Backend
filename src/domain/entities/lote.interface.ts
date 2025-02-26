import { Analisis } from "./analisis.interface";
import { Pedido } from "./pedido.interface";
import { Variedades } from "./variedades.interface";

export interface Lote {
    id_lote: string;
    productor: string;
    finca: string;
    region: string;
    departamento: string;
    fecha_compra: Date;
    peso: number;
    estado: string;
    variedades_id_variedad: string;
    user_id_user: string;
    pedido_id_pedido: string;
    analisis: Analisis[];
    pedido: Pedido[];
    variedades: Variedades[];
  }
  