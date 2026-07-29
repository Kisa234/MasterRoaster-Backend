export class CreateInventarioBolsaDto {
    private constructor(
        public readonly id_bolsa: string,
        public readonly id_almacen: string,
        public readonly cantidad: number,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateInventarioBolsaDto?] {
        let { id_bolsa, id_almacen, cantidad } = props;

        if (!id_bolsa) return ['id_bolsa es requerido', undefined];
        if (!id_almacen) return ['id_almacen es requerido', undefined];
        if (cantidad === undefined || cantidad === null || cantidad < 0) {
            return ['cantidad debe ser mayor o igual a 0', undefined];
        }

        return [undefined, new CreateInventarioBolsaDto(id_bolsa, id_almacen, cantidad)];
    }
}