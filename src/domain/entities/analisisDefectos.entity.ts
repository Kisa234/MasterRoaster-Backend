export class AnalisisDefectosEntity {
    constructor(
        public id_analisis_defecto: string,
        public grano_negro: number,
        public grano_agrio: number,
        public grano_con_hongos: number,
        public cereza_seca: number,
        public materia_estrana: number,
        public broca_severa: number,
        public negro_parcial: number,
        public agrio_parcial: number,
        public pergamino: number,
        public flotadores: number,
        public inmaduro: number,
        public averanado: number,
        public conchas: number,
        public cascara_pulpa_seca: number,
        public partido_mordido_cortado: number,
        public broca_leva: number,
        public grado: string,
        public fecha_registro: Date,
        public eliminado: boolean
    ) { }

    public static fromObject(obj: { [key: string]: any }): AnalisisDefectosEntity {
        const {
            id_analisis_defecto,
            grano_negro,
            grano_agrio,
            grano_con_hongos,
            cereza_seca,
            materia_estrana,
            broca_severa,
            negro_parcial,
            agrio_parcial,
            pergamino,
            flotadores,
            inmaduro,
            averanado,
            conchas,
            cascara_pulpa_seca,
            partido_mordido_cortado,
            broca_leva,
            grado,
            fecha_registro,
            eliminado
        } = obj;

        if (!id_analisis_defecto) throw new Error('id_analisis_defecto es requerido');
        const dateRegistro = new Date(fecha_registro);
        if (isNaN(dateRegistro.getTime())) throw new Error('fecha_registro no es válida');

        const requiredNumbers = {
            grano_negro,
            grano_agrio,
            grano_con_hongos,
            cereza_seca,
            materia_estrana,
            broca_severa,
            negro_parcial,
            agrio_parcial,
            pergamino,
            flotadores,
            inmaduro,
            averanado,
            conchas,
            cascara_pulpa_seca,
            partido_mordido_cortado,
            broca_leva
        };
        for (const [key, value] of Object.entries(requiredNumbers)) {
            if (value === undefined || typeof value !== 'number') {
                throw new Error(`${key} es requerido y debe ser un número`);
            }
        }
        if (!grado || typeof grado !== 'string') throw new Error('grado es requerido y debe ser una cadena');
        if (eliminado === undefined || typeof eliminado !== 'boolean') throw new Error('eliminado es requerido y debe ser booleano');

        return new AnalisisDefectosEntity(
            id_analisis_defecto,
            grano_negro,
            grano_agrio,
            grano_con_hongos,
            cereza_seca,
            materia_estrana,
            broca_severa,
            negro_parcial,
            agrio_parcial,
            pergamino,
            flotadores,
            inmaduro,
            averanado,
            conchas,
            cascara_pulpa_seca,
            partido_mordido_cortado,
            broca_leva,
            grado,
            dateRegistro,
            eliminado
        );
    }
}
