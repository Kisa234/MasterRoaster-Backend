export class DespacharEnvioDto {
    private constructor(
        public readonly despachado_por_id: string,
        public readonly fecha_despacho_real: Date,
        public readonly numero_tracking?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, DespacharEnvioDto?] {
        const { despachado_por_id, fecha_despacho_real, numero_tracking } = props;

        if (!despachado_por_id) return ['despachado_por_id es requerido', undefined];

        const fecha = fecha_despacho_real ? new Date(fecha_despacho_real) : new Date();
        if (isNaN(fecha.getTime())) return ['fecha_despacho_real no es válida', undefined];

        return [undefined, new DespacharEnvioDto(despachado_por_id, fecha, numero_tracking)];
    }
}
