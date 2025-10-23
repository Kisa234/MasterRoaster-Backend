export class ProductoEntity {
    constructor(
        public id_producto: string,
        public nombre: string,
        public descripcion: string | null,
        public id_categoria: string,
        public es_combo: boolean,
        public activo: boolean,
        public fecha_registro: Date,
        public fecha_editado?: Date | null,
    ) {}

    public static fromObject(obj: { [key: string]: any }): ProductoEntity {
        const {
            id_producto,
            nombre,
            descripcion,
            id_categoria,
            es_combo,
            activo,
            fecha_registro,
            fecha_editado,
        } = obj;

        if (!id_producto) throw new Error('id_producto property is required');
        if (!nombre) throw new Error('nombre property is required');
        if (typeof es_combo !== 'boolean') throw new Error('es_combo debe ser boolean');
        if (typeof activo !== 'boolean') throw new Error('activo debe ser boolean');

        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }

        const newFechaEditado = fecha_editado ? new Date(fecha_editado) : null;
        if (newFechaEditado && isNaN(newFechaEditado.getTime())) {
            throw new Error('fecha_editado no es válida');
        }

        return new ProductoEntity(
            id_producto,
            nombre,
            descripcion || null,
            id_categoria,
            es_combo,
            activo,
            newFechaRegistro,
            newFechaEditado,
        );
    }
}
