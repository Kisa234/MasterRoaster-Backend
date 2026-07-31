export class PedidoBolsaEntity {
    constructor(
        public id_pedido_bolsa: string,
        public id_pedido: string,
        public gramaje: number,
        public molienda: string,
        public cantidad: number,
    ) { }

    public static fromObject(obj: { [key: string]: any }): PedidoBolsaEntity {
        const { id_pedido_bolsa, id_pedido, gramaje, molienda, cantidad } = obj;

        if (!id_pedido_bolsa) throw new Error('id_pedido_bolsa property is required');
        if (!id_pedido) throw new Error('id_pedido property is required');
        if (gramaje === undefined || gramaje === null) throw new Error('gramaje property is required');
        if (!molienda) throw new Error('molienda property is required');
        if (cantidad === undefined || cantidad === null) throw new Error('cantidad property is required');

        return new PedidoBolsaEntity(id_pedido_bolsa, id_pedido, gramaje, molienda, cantidad);
    }
}
