import { AnalisisEntity } from "../../entities/analisis.entity";

export class CreateMuestraDto {
    private constructor(
        public readonly nombre: string,
        public readonly peso: number,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateMuestraDto?] {
        const { nombre, peso} = props;

        if (!nombre) return ['El nombre es requerido', undefined];
        if (!peso ) return ['El peso debe ser mayor a 0', undefined];

       
        return [undefined, new CreateMuestraDto(
            nombre, peso 
        )];
    }
}
