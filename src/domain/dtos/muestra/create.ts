import { AnalisisEntity } from "../../entities/analisis.entity";

export class CreateMuestraDto {
    private constructor(
        public readonly nombre: string,
        public readonly peso: number,
        public readonly user_id:string,
        public readonly analisis_id: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateMuestraDto?] {
        const { nombre, peso, user_id, analisis_id} = props;

        if (!nombre) return ['El nombre es requerido', undefined];
        if (!peso || peso <= 0) return ['El peso debe ser mayor a 0', undefined];
        if (!user_id) return ['El usuario es requerido', undefined];
        if (!analisis_id) return ['El analisis es requerido', undefined];


        return [undefined, new CreateMuestraDto(nombre, peso ,user_id, analisis_id)];
    }
}
