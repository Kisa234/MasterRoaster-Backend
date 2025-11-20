export class BoxOpcionEntity {
    constructor(
        public id_opcion: string,
        public id_box_template: string,
        public id_cafe: string,
        public tuestes: string[],
    ) { }

    public static fromObject(obj: { [key: string]: any }): BoxOpcionEntity {
        const {
            id_opcion,
            id_box_template,
            id_cafe,
            tuestes,
        } = obj;

        if (!id_opcion) throw new Error('id_opcion property is required');
        if (!id_box_template) throw new Error('id_box_template property is required');
        if (!id_cafe) throw new Error('id_cafe property is required');
        if (!Array.isArray(tuestes)) throw new Error('tuestes must be an array');

        return new BoxOpcionEntity(
            id_opcion,
            id_box_template,
            id_cafe,
            tuestes,
        );
    }
}
