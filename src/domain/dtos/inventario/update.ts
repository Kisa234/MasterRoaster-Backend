import { Molienda } from "../../entities/inventario.entity";

export class UpdateInventarioDto {
    private constructor(
        public readonly id_inventario?: string,
        public readonly id_producto?: string,
        public readonly id_lote_tostado?: string,
        public readonly cantidad?: number,
        public readonly gramaje?: number,
        public readonly molienda?: Molienda,
        public readonly unidad_medida?: string,
    ) {}

    get values() {
        const obj: { [key: string]: any } = {};
        if (this.id_producto) obj.id_producto = this.id_producto;
        if (this.id_lote_tostado) obj.id_lote_tostado = this.id_lote_tostado;
        if (this.cantidad !== undefined) obj.cantidad = this.cantidad;
        if (this.gramaje !== undefined) obj.gramaje = this.gramaje;
        if (this.molienda) obj.molienda = this.molienda;
        if (this.unidad_medida) obj.unidad_medida = this.unidad_medida;
        return obj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateInventarioDto?] {
        const {
            id_inventario,
            id_producto,
            id_lote_tostado,
            cantidad,
            gramaje,
            molienda,
            unidad_medida,
        } = props;

        if (molienda && !Object.values(Molienda).includes(molienda))
            return [`Molienda inválida. Valores permitidos: ${Object.values(Molienda).join(', ')}`, undefined];

        return [
            undefined,
            new UpdateInventarioDto(id_inventario, id_producto, id_lote_tostado, cantidad, gramaje, molienda, unidad_medida)
        ];
    }
}