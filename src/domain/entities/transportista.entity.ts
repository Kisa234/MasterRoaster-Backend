export class TransportistaEntity {
    constructor(
        public id_transportista: string,
        public nombre: string,
        public activo: boolean,
        public fecha_registro: Date,
        public contacto?: string | null,
        public telefono?: string | null,
    ) { }

    public static fromObject(obj: { [key: string]: any }): TransportistaEntity {
        const { id_transportista, nombre, activo, fecha_registro, contacto, telefono } = obj;

        if (!id_transportista) throw new Error('id_transportista property is required');
        if (!nombre) throw new Error('nombre property is required');

        const newFecha = new Date(fecha_registro);
        if (isNaN(newFecha.getTime())) throw new Error('fecha_registro no es válida');

        return new TransportistaEntity(
            id_transportista, nombre, activo ?? true, newFecha,
            contacto ?? null, telefono ?? null,
        );
    }
}
