export class AnalisisSensorialEntity {
    constructor(
        public id_analisis_sensorial: string,
        public fragancia_aroma: number,
        public sabor: number,
        public sabor_residual: number,
        public acidez: number,
        public cuerpo: number,
        public uniformidad: number,
        public balance: number,
        public taza_limpia: number,
        public dulzor: number,
        public puntaje_catador: number,
        public taza_defecto_ligero: number,
        public tazas_defecto_rechazo: number,
        public puntaje_taza: number,
        public comentario: string,
        public fecha_registro: Date,
    ) {}

    public static fromObject(obj: { [key: string]: any }): AnalisisSensorialEntity {
        const { 
            id_analisis_sensorial, fragancia_aroma, sabor, sabor_residual, acidez, cuerpo, uniformidad, 
            balance, taza_limpia, dulzor, puntaje_catador, taza_defecto_ligero, tazas_defecto_rechazo, 
            puntaje_taza, comentario, fecha_registro 
        } = obj;

        if (!id_analisis_sensorial) throw new Error('id_analisis_sensorial es requerido');
        if (fragancia_aroma === undefined) throw new Error('fragancia_aroma es requerido');
        if (sabor === undefined) throw new Error('sabor es requerido');
        if (sabor_residual === undefined) throw new Error('sabor_residual es requerido');
        if (acidez === undefined) throw new Error('acidez es requerido');
        if (cuerpo === undefined) throw new Error('cuerpo es requerido');
        if (uniformidad === undefined) throw new Error('uniformidad es requerido');
        if (balance === undefined) throw new Error('balance es requerido');
        if (taza_limpia === undefined) throw new Error('taza_limpia es requerido');
        if (dulzor === undefined) throw new Error('dulzor es requerido');
        if (puntaje_catador === undefined) throw new Error('puntaje_catador es requerido');
        if (taza_defecto_ligero === undefined) throw new Error('taza_defecto_ligero es requerido');
        if (tazas_defecto_rechazo === undefined) throw new Error('tazas_defecto_rechazo es requerido');
        if (puntaje_taza === undefined) throw new Error('puntaje_taza es requerido');
        if (!comentario) throw new Error('comentario es requerido');
        if (!fecha_registro) throw new Error('fecha_registro es requerida');

        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }

        return new AnalisisSensorialEntity(
            id_analisis_sensorial,
            fragancia_aroma,
            sabor,
            sabor_residual,
            acidez,
            cuerpo,
            uniformidad,
            balance,
            taza_limpia,
            dulzor,
            puntaje_catador,
            taza_defecto_ligero,
            tazas_defecto_rechazo,
            puntaje_taza,
            comentario,
            newFechaRegistro
        );
    }
}
