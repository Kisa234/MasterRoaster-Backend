export class UpdatePermisoDto {

    private constructor(
        public readonly id_permiso: string,
        public readonly codigo?: string,
        public readonly descripcion?: string,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.codigo) returnObj.codigo = this.codigo;
        if (this.descripcion) returnObj.descripcion = this.descripcion;

        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdatePermisoDto?] {
        const { id_permiso, codigo, descripcion } = props;

        if (!id_permiso) return ['id_permiso property is required', undefined];

        return [undefined, new UpdatePermisoDto(
            id_permiso,
            codigo,
            descripcion
        )];
    }
}
