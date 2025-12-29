export class RolEntity {

    constructor(
        public id_rol: string,
        public nombre: string,
        public activo: boolean,
        public created_at: Date,
        public descripcion?: string,
    ) {}

    static fromObject(obj: { [key: string]: any }): RolEntity {
        const { id_rol, nombre, activo, created_at, descripcion } = obj;

        if (!id_rol) throw new Error('id_rol es requerido');
        if (!nombre) throw new Error('nombre es requerido');
        if (activo === undefined) throw new Error('activo es requerido');
        if (!created_at) throw new Error('created_at es requerido');

        const newCreatedAt = new Date(created_at);
        if (isNaN(newCreatedAt.getTime())) {
            throw new Error('created_at no es válido');
        }

        return new RolEntity(
            id_rol,
            nombre,
            activo,
            newCreatedAt,
            descripcion
        );
    }
}
