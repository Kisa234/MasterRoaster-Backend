export class PermisoEntity {

    constructor(
        public id_permiso: string,
        public codigo: string,
        public modulo: string,
        public created_at: Date,
        public descripcion?: string,
    ) {}

    static fromObject(obj: { [key: string]: any }): PermisoEntity {
        const { id_permiso, codigo, modulo, created_at, descripcion } = obj;

        if (!id_permiso) throw new Error('id_permiso es requerido');
        if (!codigo) throw new Error('codigo es requerido');
        if (!modulo) throw new Error('modulo es requerido');
        if (!created_at) throw new Error('created_at es requerido');

        const newCreatedAt = new Date(created_at);
        if (isNaN(newCreatedAt.getTime())) {
            throw new Error('created_at no es válido');
        }

        return new PermisoEntity(
            id_permiso,
            codigo,
            modulo,
            newCreatedAt,
            descripcion
        );
    }
}
