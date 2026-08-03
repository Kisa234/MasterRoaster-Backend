export class PaqueteItemEntity {
    constructor(
        public id_item: string,
        public id_paquete: string,
        public entidad: string,
        public id_entidad: string,
        public id_almacen: string,
        public cantidad: number,
        public unidad_medida: string,
        public gramaje?: number | null,
        public molienda?: string | null,
        public comentario?: string | null,
    ) { }

    public static fromObject(obj: { [key: string]: any }): PaqueteItemEntity {
        const {
            id_item, id_paquete, entidad, id_entidad, id_almacen,
            cantidad, unidad_medida, gramaje, molienda, comentario,
        } = obj;

        if (!id_item) throw new Error('id_item property is required');
        if (!id_paquete) throw new Error('id_paquete property is required');
        if (!entidad) throw new Error('entidad property is required');
        if (!id_entidad) throw new Error('id_entidad property is required');
        if (!id_almacen) throw new Error('id_almacen property is required');
        if (cantidad === undefined || cantidad === null) throw new Error('cantidad property is required');
        if (!unidad_medida) throw new Error('unidad_medida property is required');

        return new PaqueteItemEntity(
            id_item, id_paquete, entidad, id_entidad, id_almacen,
            cantidad, unidad_medida,
            gramaje ?? null, molienda ?? null, comentario ?? null,
        );
    }
}
