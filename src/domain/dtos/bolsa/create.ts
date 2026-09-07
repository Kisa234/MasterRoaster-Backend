export class CreateBolsaDto {
    private constructor(
        public readonly id_lote_tostado: string,
        public readonly id_pedido: string,
        public readonly id_almacen: string,
        public readonly gramaje: number,
        public readonly molienda: string,
        public readonly cantidad: number,
        public readonly owned_by_store: boolean,
        public readonly id_user?: string,
        public readonly comentario?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateBolsaDto?] {
        let {
            id_lote_tostado,
            id_pedido,
            id_almacen,
            gramaje,
            molienda,
            cantidad,
            owned_by_store,
            id_user,
            comentario,
        } = props;

        if (!id_lote_tostado) return ['id_lote_tostado es requerido', undefined];
        if (!id_pedido) return ['id_pedido es requerido', undefined];
        if (!id_almacen) return ['id_almacen es requerido', undefined];
        if (!gramaje || gramaje <= 0) return ['El gramaje debe ser mayor a 0', undefined];
        if (!molienda) return ['La molienda es requerida', undefined];
        if (!cantidad || cantidad <= 0) return ['La cantidad debe ser mayor a 0', undefined];

        const esOwnedByStore = owned_by_store === true;

        // Nunca ambos, nunca ninguno — siempre se especifica explícitamente.
        if (esOwnedByStore && id_user) {
            return ['Una bolsa no puede ser de tienda y de cliente al mismo tiempo', undefined];
        }
        if (!esOwnedByStore && !id_user) {
            return ['Debes indicar si la bolsa es de tienda (owned_by_store) o de un cliente (id_user)', undefined];
        }

        return [undefined, new CreateBolsaDto(
            id_lote_tostado,
            id_pedido,
            id_almacen,
            gramaje,
            molienda,
            cantidad,
            esOwnedByStore,
            esOwnedByStore ? undefined : id_user,
            comentario,
        )];
    }
}