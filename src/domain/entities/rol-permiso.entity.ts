export class RolPermisoEntity {

    constructor(
        public id_rol: string,
        public id_permiso: string,
    ) {}

    static fromObject(obj: { [key: string]: any }): RolPermisoEntity {
        const { id_rol, id_permiso } = obj;

        if (!id_rol) throw new Error('id_rol es requerido');
        if (!id_permiso) throw new Error('id_permiso es requerido');

        return new RolPermisoEntity(
            id_rol,
            id_permiso
        );
    }
}
