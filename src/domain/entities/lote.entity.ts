import { AnalisisEntity } from "./analisis.entity";

export class LoteEntity {

    constructor(
        public id_lote               : string,
        public productor             : string,
        public finca                 : string,
        public region                : string,
        public departamento          : string,
        public fecha_compra          : Date, 
        public peso                  : number,
        public estado                : string,
        public variedades            : string,
        public user_id_user          : string,
        public analisis_id           : string,
        public eliminado             : boolean = false
    ){}

    public static fromObject(obj: { [key: string]: any }): LoteEntity {
        const { id_lote, productor, finca, region, departamento, fecha_compra, peso, estado, user_id_user, analisis_id, variedades } = obj;
        if (!id_lote) throw new Error('id_lote property is required');
        if (!productor) throw new Error('productor property is required');
        if (!finca) throw new Error('finca property is required');
        if (!region) throw new Error('region property is required');
        if (!departamento) throw new Error('departamento property is required');
        if (!fecha_compra) throw new Error('fecha_compra property is required');
        if (!peso) throw new Error('peso property is required');
        if (!estado) throw new Error('estado property is required');
        if (!variedades) throw new Error('variedades property is required');
        if (!user_id_user) throw new Error('user_id_user property is required');
        if (!analisis_id) throw new Error('analisis property is required');



        return new LoteEntity(
            obj.id_lote,
            obj.productor,
            obj.finca,
            obj.region,
            obj.departamento,
            new Date(obj.fecha_compra),
            obj.peso,
            obj.estado,
            obj.user_id_user,
            obj.analisis,
            obj.variedades,
            obj.eliminado
        )
    }

}