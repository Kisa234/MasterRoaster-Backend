export class CreateAnalisisRapidoDto {
    private constructor(
        public readonly id_analisis_rapido: string,
        public readonly horneado: boolean,
        public readonly humo: boolean,
        public readonly uniforme: boolean,
        public readonly verde: boolean,
        public readonly arrebatado: boolean,
        public readonly oscuro: boolean,
        public readonly comentario?: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateAnalisisRapidoDto?] {
        const { id_analisis_rapido, fecha, horneado, humo, uniforme, verde, arrebatado, oscuro, comentario } = props;

        if (!id_analisis_rapido) return ['ID del análisis rápido es requerido', undefined];
        if (fecha && isNaN(new Date(fecha).getTime())) return ['Fecha no es válida', undefined];
        if (horneado === undefined) return ['Horneado es requerido', undefined];
        if (humo === undefined) return ['Humo es requerido', undefined];
        if (uniforme === undefined) return ['Uniforme es requerido', undefined];
        if (verde === undefined) return ['Verde es requerido', undefined];
        if (arrebatado === undefined) return ['Arrebatado es requerido', undefined];
        if (oscuro === undefined) return ['Oscuro es requerido', undefined];

        return [undefined, new CreateAnalisisRapidoDto(id_analisis_rapido, horneado, humo, uniforme, verde, arrebatado, oscuro, comentario)];
    }
}