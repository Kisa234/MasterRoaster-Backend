export class ConfirmarEntregaEnvioDto {
    private constructor(
        public readonly entregado_por_id: string,
        public readonly fecha_entrega_real: Date,
    ) { }

    static create(props: { [key: string]: any }): [string?, ConfirmarEntregaEnvioDto?] {
        const { entregado_por_id, fecha_entrega_real } = props;

        if (!entregado_por_id) return ['entregado_por_id es requerido', undefined];

        const fecha = fecha_entrega_real ? new Date(fecha_entrega_real) : new Date();
        if (isNaN(fecha.getTime())) return ['fecha_entrega_real no es válida', undefined];

        return [undefined, new ConfirmarEntregaEnvioDto(entregado_por_id, fecha)];
    }
}
