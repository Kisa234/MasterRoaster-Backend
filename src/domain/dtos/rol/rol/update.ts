export class UpdateRolDto {

    private constructor(
        public readonly id_rol: string,
        public readonly nombre?: string,
        public readonly descripcion?: string,
        public readonly activo?: boolean,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.nombre) returnObj.nombre = this.nombre;
        if (this.descripcion) returnObj.descripcion = this.descripcion;
        if (this.activo !== undefined) returnObj.activo = this.activo;

        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateRolDto?] {
        const { id_rol, nombre, descripcion, activo } = props;

        if (!id_rol) return ['id_rol property is required', undefined];

        return [undefined, new UpdateRolDto(
            id_rol,
            nombre,
            descripcion,
            activo
        )];
    }
}
