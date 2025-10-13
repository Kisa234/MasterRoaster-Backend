export class ProductoComponenteEntity {
    constructor(
        public id_combo: string,
        public id_producto: string,
        public cantidad: number,
    ) {}

    public static fromObject(obj: { [key: string]: any }): ProductoComponenteEntity {
        const { id_combo, id_producto, cantidad } = obj;

        if (!id_combo) throw new Error('id_combo property is required');
        if (!id_producto) throw new Error('id_producto property is required');
        if (cantidad === undefined || cantidad === null)
            throw new Error('cantidad property is required');

        return new ProductoComponenteEntity(id_combo, id_producto, cantidad);
    }
}
