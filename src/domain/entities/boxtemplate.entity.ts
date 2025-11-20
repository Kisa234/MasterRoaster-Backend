export class BoxTemplateEntity {
    constructor(
        public id_box_template: string,
        public nombre: string,
        public descripcion: string | null,
        public activo: boolean,
        public cafe_fijo_1: string,
        public tueste_fijo_1: string[],
        public cafe_fijo_2: string,
        public tueste_fijo_2: string[],
        public fecha_creado: Date,
    ) { }

    public static fromObject(obj: { [key: string]: any }): BoxTemplateEntity {
        const {
            id_box_template,
            nombre,
            descripcion,
            activo,
            cafe_fijo_1,
            tueste_fijo_1,
            cafe_fijo_2,
            tueste_fijo_2,
            fecha_creado,
        } = obj;

        if (!id_box_template) throw new Error('id_box_template property is required');
        if (!nombre) throw new Error('nombre property is required');
        if (activo === undefined || activo === null) throw new Error('activo property is required');
        if (!cafe_fijo_1) throw new Error('cafe_fijo_1 property is required');
        if (!cafe_fijo_2) throw new Error('cafe_fijo_2 property is required');
        if (!fecha_creado) throw new Error('fecha_creado property is required');

        if (!Array.isArray(tueste_fijo_1)) throw new Error('tueste_fijo_1 must be an array');
        if (!Array.isArray(tueste_fijo_2)) throw new Error('tueste_fijo_2 must be an array');

        const newFechaCreado = new Date(fecha_creado);
        if (isNaN(newFechaCreado.getTime())) {
            throw new Error('fecha_creado is not a valid date');
        }

        return new BoxTemplateEntity(
            id_box_template,
            nombre,
            descripcion ?? null,
            activo,
            cafe_fijo_1,
            tueste_fijo_1,
            cafe_fijo_2,
            tueste_fijo_2,
            newFechaCreado,
        );
    }
}
