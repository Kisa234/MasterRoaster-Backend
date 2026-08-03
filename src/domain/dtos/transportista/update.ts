export class UpdateTransportistaDto {
    private constructor(
        public readonly values: { [key: string]: any }
    ) { }

    static update(props: { [key: string]: any }): [string?, UpdateTransportistaDto?] {
        const { nombre, contacto, telefono, activo } = props;

        const values: { [key: string]: any } = {};
        if (nombre !== undefined) values['nombre'] = nombre;
        if (contacto !== undefined) values['contacto'] = contacto;
        if (telefono !== undefined) values['telefono'] = telefono;
        if (activo !== undefined) values['activo'] = activo;

        return [undefined, new UpdateTransportistaDto(values)];
    }
}
