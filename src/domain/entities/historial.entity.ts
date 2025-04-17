export class HistorialEntity {
    constructor(
        public id_historial: string,
        public entidad: string,
        public id_entidad: string,
        public id_user: string,
        public accion: string,
        public comentario: string,
        public fecha_registro: Date,
        public cambios: any
    ) {}
  
    static fromObject(obj: { [key: string]: any }): HistorialEntity {
        const { id_historial, entidad, id_entidad, id_user, accion, comentario, fecha_registro, cambios } = obj;
    
        if (!id_historial) throw new Error('id_historial property is required');
        if (!entidad) throw new Error('entidad property is required');
        if (!id_entidad) throw new Error('id_entidad property is required');
        if (!id_user) throw new Error('id_user property is required');
        if (!accion) throw new Error('accion property is required');
        if (!comentario) throw new Error('comentario property is required');


        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }


        return new HistorialEntity(
            id_historial,
            entidad,
            id_entidad,
            id_user,
            accion,
            comentario,
            newFechaRegistro,
            cambios
        );
        
    }
  }
  