import { AnalisisEntity } from "./analisis.entity";

export class MuestraEntity {
    constructor(
        public  id_muestra: string,
        public  nombre: string,
        public  peso: number,
        public  fecha_registro:Date,
        public  eliminado: boolean,
        public  user_id?:string,
        public  analisis_id?: string,
    ){}

    static fromObject(obj: { [key: string]: any }): MuestraEntity {
        const { id_muestra,nombre, peso, fecha_registro, user_id, analisis_id,eliminado } = obj;
        if (!id_muestra) throw new Error('El id de la muestra es requerido');
        if(!nombre) throw new Error('El nombre de la muestra es requerido');
        if(!peso) throw new Error('El peso de la muestra es requerido');
        if(!fecha_registro) throw new Error('La fecha de registro es requerida');
        if(!user_id) throw new Error('El ID del usuario es requerido');
        if(!analisis_id) throw new Error('El ID del análisis es requerido');
        if(!eliminado) throw new Error('El estado de eliminado es requerido');
        return new MuestraEntity(id_muestra,nombre, peso, fecha_registro, user_id, analisis_id,eliminado);
    }
}