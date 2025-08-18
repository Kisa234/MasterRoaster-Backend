export class ProductoEntity {
    constructor(
        public readonly id_producto          : string,
        public readonly nombre               : string,
        public readonly fecha_registro       : Date,
        public readonly activo               : boolean,
        public readonly id_lote              ?: string,
        public readonly descripcion          ?: string,
        public readonly fecha_editado        ?: Date,
    ) { }

    static fromObject(obj: { [key: string]: any }): ProductoEntity {
        const{
            id_producto,   
            nombre,        
            fecha_registro,
            activo,
            id_lote,       
            descripcion,   
            fecha_editado 
        }=obj;

        if(!nombre) throw new Error('nombre property is required')

        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }

        const newfecha_editado = new Date(fecha_editado);
        if (isNaN(fecha_editado.getTime())) {
            throw new Error('fecha_editado no es válida');
        }

        return new ProductoEntity(
            id_producto,   
            nombre,        
            newFechaRegistro,
            activo,
            id_lote,       
            descripcion,   
            newfecha_editado 
        );
    }
}