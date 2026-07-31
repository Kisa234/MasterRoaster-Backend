export class UpdatePedidoBolsaDto {
    private constructor(
        public readonly gramaje?: number,
        public readonly molienda?: string,
        public readonly cantidad?: number,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.gramaje !== undefined) returnObj.gramaje = this.gramaje;
        if (this.molienda) returnObj.molienda = this.molienda;
        if (this.cantidad !== undefined) returnObj.cantidad = this.cantidad;
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdatePedidoBolsaDto?] {
        const { gramaje, molienda, cantidad } = props;

        if (gramaje !== undefined && gramaje <= 0) return ['gramaje debe ser mayor a 0', undefined];
        if (cantidad !== undefined && cantidad <= 0) return ['cantidad debe ser mayor a 0', undefined];

        return [undefined, new UpdatePedidoBolsaDto(gramaje, molienda, cantidad)];
    }
}
