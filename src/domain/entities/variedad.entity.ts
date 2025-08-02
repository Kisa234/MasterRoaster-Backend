

export class VariedadEntity {
    constructor(
        public id_variedad: string,
        public nombre: string,

    ) { }

    public static fromObject(obj: { [key: string]: any }): VariedadEntity {
        const { id_variedad, nombre } = obj;

        if (!id_variedad) throw new Error('id_variedad property is required');
        if (!nombre) throw new Error('nombre property is required');

        return new VariedadEntity(
            id_variedad,
            nombre
        );
    }
}
