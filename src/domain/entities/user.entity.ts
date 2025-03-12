import { pedido } from "@prisma/client";
import { LoteEntity } from "./lote.entity";
import { PedidoEntity } from "./pedido.entity";
import { MuestraEntity } from "./muestra.entity";

export class UserEntity {

    constructor(
        public id_user: string,
        public nombre: string,
        public email: string,
        public rol: string,
        public password: string,
        public eliminado: boolean,
        public lote: LoteEntity[],
        public muestras: MuestraEntity[],
        public pedido: PedidoEntity[],
        public fecha_registro: Date,
        public fecha_editado?: Date,
    ) { }




}