import { AnalisisEntity } from "../../entities/analisis.entity";

export class UpdateMuestraDto {
    private constructor(
        public readonly id_muestra: string,
        public readonly productor?: string,
        public readonly finca?: string,
        public readonly region?: string,
        public readonly departamento?: string,
        public readonly peso?: number,
        public readonly proceso?: string,
        public readonly variedades?: string,
        public readonly user_id?: string,
        public readonly analisis_id?: string,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.productor) returnObj.productor = this.productor;
        if (this.finca) returnObj.finca = this.finca;
        if (this.region) returnObj.region = this.region;
        if (this.departamento) returnObj.departamento = this.departamento;
        if (this.peso) returnObj.peso = this.peso;
        if (this.variedades) returnObj.variedades = this.variedades;
        if (this.proceso) returnObj.proceso = this.proceso;
        if (this.user_id) returnObj.user_id_user = this.user_id;
        if (this.analisis_id) returnObj.analisis = this.analisis_id;

        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateMuestraDto?] {
        const { id_muestra, productor, finca, region, departamento, fecha_compra, peso, estado, 
                variedades_id_variedad, user_id_user, pedido_id_pedido, variedades,proceso, analisis_id } = props;

        if (!id_muestra) return ['El ID del lote es requerido', undefined];

        let fechaParsed = fecha_compra ? new Date(fecha_compra) : undefined;
        if (fechaParsed && isNaN(fechaParsed.getTime())) return ['La fecha de compra es inválida', undefined];

        return [undefined, new UpdateMuestraDto(
            id_muestra, productor, finca, region, departamento, peso, user_id_user, variedades, proceso,analisis_id
        )];
    }
}
