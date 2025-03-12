import { AnalisisEntity } from "../../entities/analisis.entity";


export class UpdateMuestraDto {
    private constructor(
        public readonly id_muestra: string,
        public readonly nombre?: string,
        public readonly peso?: number,
        public readonly fecha_registro?: Date,
        public readonly analisis?: AnalisisEntity
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.nombre) returnObj.nombre = this.nombre;
        if (this.peso) returnObj.peso = this.peso;
        if (this.fecha_registro) returnObj.fecha_registro = this.fecha_registro;
        if (this.analisis) returnObj.analisis = this.analisis;
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateMuestraDto?] {
        const { id_muestra, nombre, peso, fecha_registro, analisis } = props;

        if (!id_muestra) return ['El ID de la muestra es requerido', undefined];

        let fechaParsed: Date | undefined;
        if (fecha_registro) {
            fechaParsed = new Date(fecha_registro);
            if (isNaN(fechaParsed.getTime())) return ['La fecha de registro es inválida', undefined];
        }

        return [undefined, new UpdateMuestraDto(id_muestra, nombre, peso, fechaParsed, analisis)];
    }
}
