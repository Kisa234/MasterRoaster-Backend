import { Molienda } from "@prisma/client";

export class CreateInventarioProductoDto {
    private constructor(
        public readonly id_producto: string,
        public readonly id_almacen:string,
        public readonly id_lote_tostado?: string,
        public readonly cantidad: number = 0,
        public readonly gramaje?: number,
        public readonly molienda: Molienda = Molienda.NINGUNO,
        public readonly unidad_medida?: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateInventarioProductoDto?] {
        const {
            id_producto,
            id_almacen,
            id_lote_tostado,
            cantidad = 0,
            gramaje,
            molienda = Molienda.NINGUNO,
            unidad_medida,
        } = props;

        if (!id_producto) return ['El ID del producto es requerido', undefined];
        if (cantidad < 0) return ['La cantidad no puede ser negativa', undefined];
        if (!Object.values(Molienda).includes(molienda))
            return [`Molienda inválida. Valores permitidos: ${Object.values(Molienda).join(', ')}`, undefined];

        return [
            undefined,
            new CreateInventarioProductoDto(id_producto,id_almacen, id_lote_tostado, cantidad, gramaje, molienda, unidad_medida)
        ];
    }
}