export class UpdateBolsaDto {
    private constructor(
        public readonly gramaje?: number,
        public readonly molienda?: string,
        public readonly cantidad?: number,
        public readonly comentario?: string,
        public readonly eliminado?: boolean,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.gramaje !== undefined) returnObj.gramaje = this.gramaje;
        if (this.molienda) returnObj.molienda = this.molienda;
        if (this.cantidad !== undefined) returnObj.cantidad = this.cantidad;
        if (this.comentario !== undefined) returnObj.comentario = this.comentario;
        if (this.eliminado !== undefined) returnObj.eliminado = this.eliminado;

        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateBolsaDto?] {
        let {
            gramaje,
            molienda,
            cantidad,
            comentario,
            eliminado,
        } = props;

        return [undefined,
            new UpdateBolsaDto(
                gramaje,
                molienda,
                cantidad,
                comentario,
                eliminado,
            )];
    }
}