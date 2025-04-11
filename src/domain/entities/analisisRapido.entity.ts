export class AnalisisRapidoEntity {
    constructor(
        public id_analisis_rapido: string,
        public fecha_registro: Date,
        public horneado: boolean,
        public humo: boolean,
        public uniforme: boolean,
        public verde: boolean,
        public arrebatado: boolean,
        public oscuro: boolean,
        public comentario?: string,
        public eliminado?: boolean,
    ) {}

    public static fromObject(obj: { [key: string]: any }): AnalisisRapidoEntity {
        const { id_analisis_rapido, fecha_registro, horneado, humo, uniforme, verde, arrebatado, oscuro, comentario } = obj;

        if (!id_analisis_rapido) throw new Error('id_analisis_rapido es requerido');
        if (!fecha_registro) throw new Error('fecha es requerida');
        if (horneado === undefined) throw new Error('horneado es requerido');
        if (humo === undefined) throw new Error('humo es requerido');
        if (uniforme === undefined) throw new Error('uniforme es requerido');
        if (verde === undefined) throw new Error('verde es requerido');
        if (arrebatado === undefined) throw new Error('arrebatado es requerido');
        if (oscuro === undefined) throw new Error('oscuro es requerido');

        const newFecha = new Date(fecha_registro);
        if (isNaN(newFecha.getTime())) {
            throw new Error('fecha no es válida');
        }

        return new AnalisisRapidoEntity(
            id_analisis_rapido,
            newFecha,
            horneado,
            humo,
            uniforme,
            verde,
            arrebatado,
            oscuro,
            comentario
        );
    }
}
