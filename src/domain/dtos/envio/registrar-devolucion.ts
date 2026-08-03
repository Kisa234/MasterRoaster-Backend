export class RegistrarDevolucionEnvioDto {
    private constructor(
        public readonly registrado_por_id: string,
        public readonly comentario?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, RegistrarDevolucionEnvioDto?] {
        const { registrado_por_id, comentario } = props;

        if (!registrado_por_id) return ['registrado_por_id es requerido', undefined];

        return [undefined, new RegistrarDevolucionEnvioDto(registrado_por_id, comentario)];
    }
}
