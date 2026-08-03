export class CreatePaqueteDto {
    private constructor(
        public readonly id_cliente: string,
        public readonly creado_por_id: string,
        public readonly id_pedido_origen?: string,
        public readonly comentario?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreatePaqueteDto?] {
        const { id_cliente, creado_por_id, id_pedido_origen, comentario } = props;

        if (!id_cliente) return ['id_cliente es requerido', undefined];
        if (!creado_por_id) return ['creado_por_id es requerido', undefined];

        return [undefined, new CreatePaqueteDto(id_cliente, creado_por_id, id_pedido_origen, comentario)];
    }
}
