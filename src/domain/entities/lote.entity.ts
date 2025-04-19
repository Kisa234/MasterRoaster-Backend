export class LoteEntity {
    constructor(
        public id_lote: string,
        public productor: string,
        public finca: string,
        public region: string,
        public departamento: string,
        public peso: number,
        public variedades: string,
        public proceso: string,
        public fecha_registro: Date, 
        public eliminado: boolean,
        public id_user: string | null,
        public id_analisis: string | null,
    ) {}

    public static fromObject(obj: { [key: string]: any }): LoteEntity {
        const { id_lote, productor, finca, region, departamento, peso, variedades, proceso, fecha_registro } = obj;
        if (!id_lote) throw new Error('id_lote property is required');
        if (!productor) throw new Error('productor property is required');
        if (!finca) throw new Error('finca property is required');
        if (!region) throw new Error('region property is required');
        if (!departamento) throw new Error('departamento property is required');
        if (!peso) throw new Error('peso property is required');
        if (!variedades) throw new Error('variedades property is required');
        if (!proceso) throw new Error('proceso property is required');
        // Estos campos son opcionales, no deben lanzar error si no existen
        const id_user = obj.id_user ?? undefined;
        const id_analisis = obj.analisis_id ?? undefined;
        const eliminado = obj.eliminado ?? false; // Valor por defecto si no existe

        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }

        return new LoteEntity(
            id_lote,
            productor,
            finca,
            region,
            departamento,
            peso,
            variedades,
            proceso,
            newFechaRegistro,
            eliminado,
            id_user,
            id_analisis
        );
    }
}
