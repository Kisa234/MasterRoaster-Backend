export class CreateTransportistaDto {
    private constructor(
        public readonly nombre: string,
        public readonly contacto?: string,
        public readonly telefono?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateTransportistaDto?] {
        const { nombre, contacto, telefono } = props;

        if (!nombre) return ['nombre es requerido', undefined];

        return [undefined, new CreateTransportistaDto(nombre, contacto, telefono)];
    }
}
