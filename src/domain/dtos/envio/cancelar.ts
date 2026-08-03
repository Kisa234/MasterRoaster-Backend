export class CancelarEnvioDto {
    private constructor(
        public readonly cancelado_por_id: string,
        public readonly comentario_cancelacion?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CancelarEnvioDto?] {
        const { cancelado_por_id, comentario_cancelacion } = props;

        if (!cancelado_por_id) return ['cancelado_por_id es requerido', undefined];

        return [undefined, new CancelarEnvioDto(cancelado_por_id, comentario_cancelacion)];
    }
}
