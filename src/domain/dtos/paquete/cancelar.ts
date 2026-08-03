export class CancelarPaqueteDto {
    private constructor(
        public readonly cancelado_por_id: string,
        public readonly comentario?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CancelarPaqueteDto?] {
        const { cancelado_por_id, comentario } = props;

        if (!cancelado_por_id) return ['cancelado_por_id es requerido', undefined];

        return [undefined, new CancelarPaqueteDto(cancelado_por_id, comentario)];
    }
}
