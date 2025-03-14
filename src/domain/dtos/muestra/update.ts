import { AnalisisEntity } from "../../entities/analisis.entity";


export class UpdateMuestraDto {
    private constructor(
        public readonly nombre: string,
        public readonly peso: number,
        public readonly fecha_registro:Date,
        public readonly user_id:string,
        public readonly analisis_id: string,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.nombre) returnObj['nombre'] = this.nombre;
        if (this.peso) returnObj['peso'] = this.peso;
        if (this.fecha_registro) returnObj['fecha_registro'] = this.fecha_registro;
        if (this.user_id) returnObj['user_id'] = this.user_id;
        if (this.analisis_id) returnObj['analisis_id'] = this.analisis_id;
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateMuestraDto?] {
        const { id_muestra, nombre, peso, fecha_registro, analisis } = props;

        if (!id_muestra) return ['El ID de la muestra es requerido', undefined];
        if (!nombre) return ['El nombre es requerido', undefined];
        if (!peso || peso <= 0) return ['El peso debe ser mayor a 0', undefined];
        if (!fecha_registro) return ['La fecha de registro es requerida', undefined];
        if (!analisis) return ['El análisis es requerido', undefined];
    

        let fechaParsed: Date | undefined;
        if (fecha_registro) {
            fechaParsed = new Date(fecha_registro);
            if (isNaN(fechaParsed.getTime())) return ['La fecha de registro es inválida', undefined];
        }

        return [undefined, new UpdateMuestraDto(nombre, peso, fechaParsed!, id_muestra, analisis)];
    }
}
