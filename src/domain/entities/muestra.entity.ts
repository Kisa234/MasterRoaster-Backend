
export class MuestraEntity {
    constructor(
        public id_muestra: string,
        public productor: string,
        public finca: string,
        public region: string,
        public departamento: string,
        public peso: number,
        public variedades: string,
        public eliminado: boolean,
        public user_id_user: string | null,
        public analisis_id: string | null,
    ) {}

    public static fromObject(obj: { [key: string]: any }): MuestraEntity {
        const { id_lote, productor, finca, region, departamento, peso, variedades } = obj;
        if (!id_lote) throw new Error('id_lote property is required');
        if (!productor) throw new Error('productor property is required');
        if (!finca) throw new Error('finca property is required');
        if (!region) throw new Error('region property is required');
        if (!departamento) throw new Error('departamento property is required');
        if (!peso) throw new Error('peso property is required');
        if (!variedades) throw new Error('variedades property is required');
        
        // Estos campos son opcionales, no deben lanzar error si no existen
        const user_id_user = obj.user_id_user ?? undefined;
        const analisis_id = obj.analisis_id ?? undefined;
        const eliminado = obj.eliminado ?? false; // Valor por defecto si no existe

        return new MuestraEntity(
            id_lote,
            productor,
            finca,
            region,
            departamento,
            peso,
            variedades,
            eliminado,
            user_id_user,
            analisis_id
        );
    }
}
