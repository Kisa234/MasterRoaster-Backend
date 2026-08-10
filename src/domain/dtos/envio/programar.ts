export class ProgramarEnvioDto {
    private constructor(
        public readonly fecha_programada: Date,
        public readonly medio_envio?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, ProgramarEnvioDto?] {
        const { fecha_programada, medio_envio } = props;

        if (!fecha_programada) return ['fecha_programada es requerida', undefined];

        const fecha = new Date(fecha_programada);
        if (isNaN(fecha.getTime())) return ['fecha_programada no es válida', undefined];

        return [undefined, new ProgramarEnvioDto(fecha, medio_envio)];
    }
}