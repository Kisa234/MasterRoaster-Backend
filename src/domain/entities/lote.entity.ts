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

        if (!obj.id_lote) throw new Error('id_lote property is required');
        if (!obj.productor) throw new Error('productor property is required');
        if (!obj.finca) throw new Error('finca property is required');
        if (!obj.region) throw new Error('region property is required');
        if (!obj.departamento) throw new Error('departamento property is required');
        if (!obj.fecha_compra) throw new Error('fecha_compra property is required');
        if (!obj.peso) throw new Error('peso property is required');
        if (!obj.variedades) throw new Error('variedades property is required');
        
        // Estos campos son opcionales, no deben lanzar error si no existen
        const user_id_user = obj.user_id_user ?? undefined;
        const analisis_id = obj.analisis_id ?? undefined;
        const eliminado = obj.eliminado ?? false; // Valor por defecto si no existe

        return new LoteEntity(
            obj.id_lote,
            obj.productor,
            obj.finca,
            obj.region,
            obj.departamento,
            new Date(obj.fecha_compra),
            obj.peso,
            obj.variedades,
            eliminado,
            user_id_user,
            analisis_id
        );
    }
}
