export type TMolienda = 'ENTERO' | 'MOLIDO';

export class ProductoSkuEntity {
    constructor(
        public readonly id_sku          : string,
        public readonly id_producto     : string,
        public readonly id_lote_tostado : string,
        public readonly gramaje         : number,
        public readonly molienda        : TMolienda,
        public readonly cantidad        : number,
        public readonly eliminado       : boolean,
        public readonly fecha_registro  : Date,
        public readonly sku_code        ?: string,
        public readonly fecha_editado   ?: Date,
    ) { }

    static fromObject(obj: { [key: string]: any }): ProductoSkuEntity {
        const {
            id_sku,
            sku_code,
            id_producto,
            id_lote_tostado,
            gramaje,
            molienda,
            cantidad,
            eliminado,
            fecha_registro,
            fecha_editado,
        } = obj;

        if (!id_sku) throw new Error('id_sku property is required');
        if (!id_producto) throw new Error('id_producto property is required');
        if (!id_lote_tostado) throw new Error('id_lote_tostado property is required');

        const gramajeNum = Number(gramaje);
        if (!Number.isFinite(gramajeNum) || gramajeNum <= 0) throw new Error('gramaje inválido');

        const cantidadNum = Number(cantidad ?? 0);
        if (!Number.isInteger(cantidadNum) || cantidadNum < 0) throw new Error('cantidad inválida');

        if (molienda !== 'ENTERO' && molienda !== 'MOLIDO') throw new Error('molienda inválida');
        if (typeof eliminado !== 'boolean') throw new Error('eliminado property must be boolean');

        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }

        const newFechaEditado = new Date(fecha_editado);
        if (isNaN(newFechaEditado.getTime())) {
            throw new Error('fecha_editado no es válida');
        }

        return new ProductoSkuEntity(
            id_sku,
            id_producto,
            id_lote_tostado,
            gramajeNum,
            molienda,
            cantidadNum,
            eliminado,
            newFechaRegistro,
            sku_code,
            newFechaEditado
        );
    }
}
