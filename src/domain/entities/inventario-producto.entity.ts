import { Molienda } from "@prisma/client";

export class InventarioProductoEntity {
    constructor(
        public id_inventario: string,
        public id_producto: string,
        public id_lote_tostado: string | null,
        public cantidad: number,
        public gramaje: number | null,
        public molienda: Molienda,
        public unidad_medida: string | null,
        public fecha_registro: Date,
        public fecha_editado?: Date | null,
    ) { }

    public static fromObject(obj: { [key: string]: any }): InventarioProductoEntity {
        const {
            id_inventario,
            id_producto,
            id_lote_tostado,
            cantidad,
            gramaje,
            molienda,
            unidad_medida,
            fecha_registro,
            fecha_editado,
        } = obj;

        if (!id_inventario) throw new Error('id_inventario property is required');
        if (!id_producto) throw new Error('id_producto property is required');
        if (!cantidad) throw new Error('cantidad property is required');


        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }

        const newFechaEditado = new Date(fecha_editado);
        if (newFechaEditado && isNaN(newFechaEditado.getTime())) {
            throw new Error('fecha_editado no es válida');
        }

        return new InventarioProductoEntity(
            id_inventario,
            id_producto,
            id_lote_tostado,
            cantidad,
            gramaje,
            molienda,
            unidad_medida,
            newFechaRegistro,
            newFechaEditado,
        );
    }
}
