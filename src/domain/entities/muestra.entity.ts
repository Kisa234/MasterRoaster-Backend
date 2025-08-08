
export class MuestraEntity {
    constructor(
        public id_muestra: string,
        public nombre_muestra:string,
        public proveedor: string,
        public productor: string,
        public finca: string,
        public distrito: string,
        public departamento: string,
        public peso: number,
        public variedades: string,
        public proceso: string,
        public fecha_registro: Date, 
        public eliminado: boolean,
        public id_user: string,
        public id_analisis: string
    ) {}

    public static fromObject(obj: { [key: string]: any }): MuestraEntity {
        const { 
            id_muestra,
            nombre_muestra,
            proveedor,
            productor,
            finca,
            distrito,
            departamento,
            peso,
            variedades,
            proceso,
            fecha_registro,
            eliminado = false,
            id_user = '',
            id_analisis = ''
        } = obj;
        
        if (!peso) throw new Error('peso property is required');
        if (!variedades) throw new Error('variedades property is required');
        if (!proceso) throw new Error('proceso property is required');

        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }

        return new MuestraEntity(
            id_muestra,
            nombre_muestra,
            proveedor,
            productor,
            finca,
            distrito,
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
