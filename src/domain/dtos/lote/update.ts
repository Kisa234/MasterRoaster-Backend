import { AnalisisEntity } from "../../entities/analisis.entity";

export class UpdateLoteDto {
    private constructor(
        public readonly id_lote: string,
        public readonly productor?: string,
        public readonly finca?: string,
        public readonly region?: string,
        public readonly departamento?: string,
        public readonly fecha_compra?: Date,
        public readonly peso?: number,
        public readonly estado?: string,
        public readonly variedades_id_variedad?: string,
        public readonly user_id_user?: string,
        public readonly pedido_id_pedido?: string,
        public readonly variedades?: string,
        public readonly analisis?: AnalisisEntity
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.productor) returnObj.productor = this.productor;
        if (this.finca) returnObj.finca = this.finca;
        if (this.region) returnObj.region = this.region;
        if (this.departamento) returnObj.departamento = this.departamento;
        if (this.fecha_compra) returnObj.fecha_compra = this.fecha_compra;
        if (this.peso) returnObj.peso = this.peso;
        if (this.estado) returnObj.estado = this.estado;
        if (this.variedades_id_variedad) returnObj.variedades_id_variedad = this.variedades_id_variedad;
        if (this.user_id_user) returnObj.user_id_user = this.user_id_user;
        if (this.pedido_id_pedido) returnObj.pedido_id_pedido = this.pedido_id_pedido;
        if (this.variedades) returnObj.variedades = this.variedades;
        if (this.analisis) returnObj.analisis = this.analisis;

        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateLoteDto?] {
        const { id_lote, productor, finca, region, departamento, fecha_compra, peso, estado, 
                variedades_id_variedad, user_id_user, pedido_id_pedido, variedades, analisis } = props;

        if (!id_lote) return ['El ID del lote es requerido', undefined];

        let fechaParsed = fecha_compra ? new Date(fecha_compra) : undefined;
        if (fechaParsed && isNaN(fechaParsed.getTime())) return ['La fecha de compra es inválida', undefined];

        return [undefined, new UpdateLoteDto(
            id_lote, productor, finca, region, departamento, fechaParsed, peso, estado, 
            variedades_id_variedad, user_id_user, pedido_id_pedido, variedades, analisis
        )];
    }
}
