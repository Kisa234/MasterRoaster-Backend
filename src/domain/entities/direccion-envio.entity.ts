export class DireccionEnvioEntity {
    constructor(
        public id_direccion: string,
        public id_envio: string,
        public nombre_destinatario: string,
        public telefono: string,
        public direccion: string,
        public distrito: string,
        public provincia: string,
        public departamento: string,
        public pais: string,
        public fecha_registro: Date,
        public codigo_postal?: string | null,
        public referencia?: string | null,
        public observaciones?: string | null,
    ) { }

    public static fromObject(obj: { [key: string]: any }): DireccionEnvioEntity {
        const {
            id_direccion, id_envio, nombre_destinatario, telefono, direccion,
            distrito, provincia, departamento, pais, fecha_registro,
            codigo_postal, referencia, observaciones,
        } = obj;

        if (!id_direccion) throw new Error('id_direccion property is required');
        if (!id_envio) throw new Error('id_envio property is required');
        if (!nombre_destinatario) throw new Error('nombre_destinatario property is required');
        if (!telefono) throw new Error('telefono property is required');
        if (!direccion) throw new Error('direccion property is required');
        if (!distrito) throw new Error('distrito property is required');
        if (!provincia) throw new Error('provincia property is required');
        if (!departamento) throw new Error('departamento property is required');

        const newFecha = new Date(fecha_registro);
        if (isNaN(newFecha.getTime())) throw new Error('fecha_registro no es válida');

        return new DireccionEnvioEntity(
            id_direccion, id_envio, nombre_destinatario, telefono, direccion,
            distrito, provincia, departamento, pais ?? 'Perú', newFecha,
            codigo_postal ?? null, referencia ?? null, observaciones ?? null,
        );
    }
}
