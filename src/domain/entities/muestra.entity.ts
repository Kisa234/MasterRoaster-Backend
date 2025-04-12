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
        const { id_muestra,nombre, peso, fecha_registro } = obj;
        if (!id_muestra) throw new Error('El id de la muestra es requerido');
        if(!nombre) throw new Error('El nombre de la muestra es requerido');
        if(!peso) throw new Error('El peso de la muestra es requerido');
        if(!fecha_registro) throw new Error('La fecha de registro es requerida');
        

        const user_id = obj.user_id_user ?? undefined;
        const analisis_id = obj.analisis_id ?? undefined;
        const eliminado = obj.eliminado ?? false; // Valor por defecto si no existe

        
        return new MuestraEntity(
          id_muestra,
          nombre,
          peso,
          new Date(fecha_registro),
          eliminado,
          user_id? '' : '',
          analisis_id? '' : '',
        );

    }
}