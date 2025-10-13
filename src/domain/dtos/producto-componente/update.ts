export class UpdateProductoComponenteDto {
    private constructor(
        public readonly id_combo?: string,
        public readonly id_producto?: string,
        public readonly cantidad?: number,
    ) {}

    get values() {
        const obj: { [key: string]: any } = {};
        if (this.cantidad !== undefined) obj.cantidad = this.cantidad;
        return obj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateProductoComponenteDto?] {
        const { id_combo, id_producto, cantidad } = props;

        if (cantidad !== undefined && cantidad <= 0)
            return ['La cantidad debe ser mayor a 0', undefined];

        return [undefined, new UpdateProductoComponenteDto(id_combo, id_producto, cantidad)];
    }
}