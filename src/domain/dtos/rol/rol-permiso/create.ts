export class CreateRolPermisoDto {

    private constructor(
        public readonly id_rol: string,
        public readonly id_permiso: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateRolPermisoDto?] {
        const { id_rol, id_permiso } = props;

        if (!id_rol) return ['id_rol property is required', undefined];
        if (!id_permiso) return ['id_permiso property is required', undefined];

        return [undefined, new CreateRolPermisoDto(
            id_rol,
            id_permiso
        )];
    }
}
