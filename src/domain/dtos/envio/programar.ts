export class ProgramarEnvioDto {
    private constructor(
        public readonly fecha_programada: Date,
        public readonly id_transportista: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, ProgramarEnvioDto?] {
        const { fecha_programada, id_transportista } = props;

        if (!fecha_programada) return ['fecha_programada es requerida', undefined];
        if (!id_transportista) return ['id_transportista es requerido', undefined];

        const fecha = new Date(fecha_programada);
        if (isNaN(fecha.getTime())) return ['fecha_programada no es válida', undefined];

        return [undefined, new ProgramarEnvioDto(fecha, id_transportista)];
    }
}
