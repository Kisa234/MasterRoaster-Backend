export class CreateVariedadDto {
    private constructor(
        public readonly nombre: string,

    ) {}

    static create(props: { [key: string]: any }): [string?, CreateVariedadDto?] {
        let { nombre} = props;

        if (!nombre) return ['Nombre es requerido', undefined];


        return [undefined, new CreateVariedadDto(nombre)];
    }
}
