export class PedidoItemEntity {
    constructor(
        public id_pedido_item: string,
        public id_pedido: string,
        public entidad: string,   // EntidadInventario: LOTE | LOTE_TOSTADO | PRODUCTO | MUESTRA | INSUMO | BOLSA
        public id_entidad: string,
        public cantidad: number,
    ) { }

    public static fromObject(obj: { [key: string]: any }): PedidoItemEntity {
        const { id_pedido_item, id_pedido, entidad, id_entidad, cantidad } = obj;

        if (!id_pedido_item) throw new Error('id_pedido_item property is required');
        if (!id_pedido) throw new Error('id_pedido property is required');
        if (!entidad) throw new Error('entidad property is required');
        if (!id_entidad) throw new Error('id_entidad property is required');
        if (cantidad === undefined || cantidad === null) throw new Error('cantidad property is required');

        return new PedidoItemEntity(id_pedido_item, id_pedido, entidad, id_entidad, cantidad);
    }
}
