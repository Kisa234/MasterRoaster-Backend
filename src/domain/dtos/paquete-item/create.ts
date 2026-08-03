export class CreatePaqueteItemDto {
    private constructor(
        public readonly id_paquete: string,
        public readonly entidad: string,
        public readonly id_entidad: string,
        public readonly id_almacen: string,
        public readonly cantidad: number,
        public readonly unidad_medida: string,
        public readonly gramaje?: number,
        public readonly molienda?: string,
        public readonly comentario?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreatePaqueteItemDto?] {
        const {
            id_paquete, entidad, id_entidad, id_almacen,
            cantidad, unidad_medida, gramaje, molienda, comentario,
        } = props;

        if (!id_paquete) return ['id_paquete es requerido', undefined];
        if (!entidad) return ['entidad es requerida', undefined];
        if (!id_entidad) return ['id_entidad es requerido', undefined];
        if (!id_almacen) return ['id_almacen es requerido', undefined];
        if (cantidad === undefined || cantidad === null || cantidad <= 0)
            return ['cantidad debe ser mayor a 0', undefined];
        if (!unidad_medida) return ['unidad_medida es requerida', undefined];

        return [undefined, new CreatePaqueteItemDto(
            id_paquete, entidad, id_entidad, id_almacen,
            cantidad, unidad_medida, gramaje, molienda, comentario,
        )];
    }
}
