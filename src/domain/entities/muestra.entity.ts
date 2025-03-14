import { AnalisisEntity } from "./analisis.entity";

export class MuestraEntity {
    constructor(
        public  nombre: string,
        public  peso: number,
        public  fecha_registro:Date,
        public  user_id:string,
        public  analisis_id: string,
        public  eliminado?: boolean
    ){}

    static fromObject(obj: { [key: string]: any }): MuestraEntity {
        const { nombre, peso, fecha_registro, user_id, analisis_id,eliminado } = obj;
        if(!nombre) throw new Error('El nombre de la muestra es requerido');
        if(!peso) throw new Error('El peso de la muestra es requerido');
        if(!fecha_registro) throw new Error('La fecha de registro es requerida');
        if(!user_id) throw new Error('El ID del usuario es requerido');
        if(!analisis_id) throw new Error('El ID del análisis es requerido');
        if(!eliminado) throw new Error('El estado de eliminado es requerido');
        return new MuestraEntity(nombre, peso, fecha_registro, user_id, analisis_id,eliminado);
    }
}