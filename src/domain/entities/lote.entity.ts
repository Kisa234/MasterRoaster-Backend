export class LoteEntity {
    constructor(
        public id_lote: string,
        public productor: string,
        public finca: string,
        public region: string,
        public departamento: string,
        public fecha_compra: Date, 
        public peso: number,
        public variedades: string,
        public eliminado: boolean,
        public user_id_user?: string,
        public analisis_id?: string,
    ) {}

    public static fromObject(obj: { [key: string]: any }): LoteEntity {
        const { id_lote, productor, finca, region, departamento, fecha_compra, peso, variedades } = obj;
        if (!id_lote) throw new Error('id_lote property is required');
        if (!productor) throw new Error('productor property is required');
        if (!finca) throw new Error('finca property is required');
        if (!region) throw new Error('region property is required');
        if (!departamento) throw new Error('departamento property is required');
        if (!fecha_compra) throw new Error('fecha_compra property is required');
        if (!peso) throw new Error('peso property is required');
        if (!variedades) throw new Error('variedades property is required');
        
        // Estos campos son opcionales, no deben lanzar error si no existen
        const user_id_user = obj.user_id_user ?? undefined;
        const analisis_id = obj.analisis_id ?? undefined;
        const eliminado = obj.eliminado ?? false; // Valor por defecto si no existe

        return new LoteEntity(
            id_lote,
            productor,
            finca,
            region,
            departamento,
            new Date(fecha_compra),
            peso,
            variedades,
            eliminado,
            user_id_user,
            analisis_id
        );
    }
}
