export class AsignarPedidoDto {
    constructor(
        public readonly id_pedido: string,
        public readonly asignado_a_id: string,
        public readonly fecha_asignacion: Date
    ) {}

    static assign(props: { [key: string]: any }): [string?, AsignarPedidoDto?] {
        const { id_pedido, asignado_a_id, fecha_asignacion } = props;

        if (!id_pedido) return ['El ID del pedido es requerido', undefined];
        if (!asignado_a_id) return ['El ID del usuario asignado es requerido', undefined];

        const fechaAsignacionParsed = new Date(fecha_asignacion);
        if (isNaN(fechaAsignacionParsed.getTime())) {
            return ['La fecha de asignación es inválida', undefined];
        }

        return [undefined, new AsignarPedidoDto(id_pedido, asignado_a_id, fechaAsignacionParsed)];
    }
}
