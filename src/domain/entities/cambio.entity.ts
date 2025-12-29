export class CambioEntity {

    constructor(
        public id_cambio: string,
        public entidad: string,
        public id_entidad: string,
        public objeto_antes: any,
        public id_user: string,
        public created_at: Date,
        public comentario?: string,
    ) {}

    static fromObject(obj: { [key: string]: any }): CambioEntity {
        const {
            id_cambio,
            entidad,
            id_entidad,
            objeto_antes,
            id_user,
            created_at,
            comentario
        } = obj;

        if (!id_cambio) throw new Error('id_cambio es requerido');
        if (!entidad) throw new Error('entidad es requerida');
        if (!id_entidad) throw new Error('id_entidad es requerido');
        if (!objeto_antes) throw new Error('objeto_antes es requerido');
        if (!id_user) throw new Error('id_user es requerido');
        if (!created_at) throw new Error('created_at es requerido');

        const newCreatedAt = new Date(created_at);
        if (isNaN(newCreatedAt.getTime())) {
            throw new Error('created_at no es válido');
        }

        return new CambioEntity(
            id_cambio,
            entidad,
            id_entidad,
            objeto_antes,
            id_user,
            newCreatedAt,
            comentario
        );
    }
}
