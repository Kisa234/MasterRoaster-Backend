export class BoxRespuestaEntity {
    constructor(
        public id_respuesta: string,
        public id_box_template: string,
        public id_user: string,
        public molienda_1: string,
        public molienda_2: string,
        public molienda_3: string,
        public tueste_1: string,
        public tueste_2: string,
        public tueste_3: string,
        public id_cafe_elegido: string,
        public fecha_registro: Date,
    ) { }

    public static fromObject(obj: { [key: string]: any }): BoxRespuestaEntity {
        const {
            id_respuesta,
            id_box_template,
            id_user,
            molienda_1,
            molienda_2,
            molienda_3,
            tueste_1,
            tueste_2,
            tueste_3,
            id_cafe_elegido,
            fecha_registro,
        } = obj;

        if (!id_respuesta) throw new Error('id_respuesta property is required');
        if (!id_box_template) throw new Error('id_box_template property is required');
        if (!id_user) throw new Error('id_user property is required');

        if (!molienda_1) throw new Error('molienda_1 property is required');
        if (!molienda_2) throw new Error('molienda_2 property is required');
        if (!molienda_3) throw new Error('molienda_3 property is required');

        if (!tueste_1) throw new Error('tueste_1 property is required');
        if (!tueste_2) throw new Error('tueste_2 property is required');
        if (!tueste_3) throw new Error('tueste_3 property is required');

        if (!id_cafe_elegido) throw new Error('id_cafe_elegido property is required');
        if (!fecha_registro) throw new Error('fecha_registro property is required');

        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro is not a valid date');
        }

        return new BoxRespuestaEntity(
            id_respuesta,
            id_box_template,
            id_user,
            molienda_1,
            molienda_2,
            molienda_3,
            tueste_1,
            tueste_2,
            tueste_3,
            id_cafe_elegido,
            newFechaRegistro,
        );
    }
}
