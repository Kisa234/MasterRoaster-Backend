export class BolsaEntity {
    constructor(
        public id_bolsa: string,
        public id_lote_tostado: string,
        public id_pedido: string,
        public gramaje: number,
        public molienda: string,
        public cantidad: number,
        public fecha_embolsado: Date,
        public eliminado: boolean,
        public id_user?: string,
        public comentario?: string,
    ) { }

    public static fromObject(obj: { [key: string]: any }): BolsaEntity {
        const {
            id_bolsa,
            id_lote_tostado,
            id_pedido,
            gramaje,
            molienda,
            cantidad,
            eliminado,
            id_user,
            comentario,
            fecha_embolsado,
        } = obj;

        if (!id_bolsa) throw new Error('id_bolsa property is required');
        if (!id_lote_tostado) throw new Error('id_lote_tostado property is required');
        if (!id_pedido) throw new Error('id_pedido property is required');
        if (!molienda) throw new Error('molienda property is required');
        if (gramaje === undefined || gramaje === null) throw new Error('gramaje property is required');
        if (cantidad === undefined || cantidad === null) throw new Error('cantidad property is required');

        const newFechaEmbolsado = new Date(fecha_embolsado);
        if (isNaN(newFechaEmbolsado.getTime())) {
            throw new Error('fecha_embolsado no es válida');
        }

        return new BolsaEntity(
            id_bolsa,
            id_lote_tostado,
            id_pedido,
            gramaje,
            molienda,
            cantidad,
            newFechaEmbolsado,
            eliminado,
            id_user,
            comentario,
        );
    }
}

export interface InventarioBolsaMini {
    id_inventario: string;
    id_bolsa: string;
    id_almacen: string;
    cantidad: number;
    fecha_registro: Date;
    fecha_editado?: Date | null;
    almacen?: {
        id_almacen: string;
        nombre: string;
    } | null;
}

export class BolsaConInventarioEntity {
    constructor(
        public id_bolsa: string,
        public id_lote_tostado: string,
        public id_pedido: string,
        public gramaje: number,
        public molienda: string,
        public cantidad: number,
        public fecha_embolsado: Date,
        public eliminado: boolean,

        // ✅ extra solo para estos casos
        public inventarioBolsas: InventarioBolsaMini[] = [],

        public id_user?: string,
        public comentario?: string,
    ) { }

    static fromObject(obj: { [key: string]: any }): BolsaConInventarioEntity {
        const {
            id_bolsa,
            id_lote_tostado,
            id_pedido,
            gramaje,
            molienda,
            cantidad,
            eliminado,
            id_user,
            comentario,
            fecha_embolsado,
            inventarioBolsas,
        } = obj;

        if (!id_bolsa) throw new Error('id_bolsa property is required');
        if (!id_lote_tostado) throw new Error('id_lote_tostado property is required');
        if (!id_pedido) throw new Error('id_pedido property is required');
        if (!molienda) throw new Error('molienda property is required');

        const newFechaEmbolsado = new Date(fecha_embolsado);
        if (isNaN(newFechaEmbolsado.getTime())) throw new Error('fecha_embolsado no es válida');

        const invMapped: InventarioBolsaMini[] = Array.isArray(inventarioBolsas)
            ? inventarioBolsas.map((i: any) => ({
                id_inventario: i.id_inventario,
                id_bolsa: i.id_bolsa,
                id_almacen: i.id_almacen,
                cantidad: Number(i.cantidad ?? 0),
                fecha_registro: new Date(i.fecha_registro),
                fecha_editado: i.fecha_editado ? new Date(i.fecha_editado) : null,
                almacen: i.almacen
                    ? { id_almacen: i.almacen.id_almacen, nombre: i.almacen.nombre }
                    : null,
            }))
            : [];

        return new BolsaConInventarioEntity(
            id_bolsa,
            id_lote_tostado,
            id_pedido,
            gramaje,
            molienda,
            cantidad,
            newFechaEmbolsado,
            eliminado,
            invMapped,
            id_user,
            comentario,
        );
    }
}