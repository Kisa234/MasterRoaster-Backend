export class InventarioBolsaEntity {
    constructor(
        public id_inventario: string,
        public id_bolsa: string,
        public id_almacen: string,
        public cantidad: number,
        public fecha_registro: Date,
        public fecha_editado?: Date,
    ) { }

    public static fromObject(obj: { [key: string]: any }): InventarioBolsaEntity {
        const {
            id_inventario,
            id_bolsa,
            id_almacen,
            cantidad,
            fecha_registro,
            fecha_editado,
        } = obj;

        if (!id_inventario) throw new Error('id_inventario property is required');
        if (!id_bolsa) throw new Error('id_bolsa property is required');
        if (!id_almacen) throw new Error('id_almacen property is required');

        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }

        const newFechaEditado = fecha_editado ? new Date(fecha_editado) : undefined;
        if (newFechaEditado && isNaN(newFechaEditado.getTime())) {
            throw new Error('fecha_editado no es válida');
        }

        return new InventarioBolsaEntity(
            id_inventario,
            id_bolsa,
            id_almacen,
            cantidad ?? 0,
            newFechaRegistro,
            newFechaEditado,
        );
    }
}