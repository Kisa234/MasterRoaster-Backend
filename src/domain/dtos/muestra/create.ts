import { AnalisisEntity } from "../../entities/analisis.entity";

export class CreateMuestraDto {
    private constructor(
        public readonly nombre: string,
        public readonly peso: number,
        public readonly fecha_registro: Date,
        public readonly analisis: AnalisisEntity
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateMuestraDto?] {
        const { nombre, peso, fecha_registro, analisis } = props;

        if (!nombre) return ['El nombre es requerido', undefined];
        if (!peso || peso <= 0) return ['El peso debe ser mayor a 0', undefined];

        let fechaParsed = new Date(fecha_registro);
        if (isNaN(fechaParsed.getTime())) return ['La fecha de registro es inválida', undefined];

        if (!analisis) return ['El análisis es requerido', undefined];

        return [undefined, new CreateMuestraDto(nombre, peso, fechaParsed, analisis)];
    }
}
