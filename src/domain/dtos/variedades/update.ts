export class UpdateVariedadDto {
    private constructor(
        public readonly id_variedad: string,
        public readonly nombre:string,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.nombre) returnObj.nombre = this.nombre;
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateVariedadDto?] {
        const { id_variedad, nombre } = props;
        if (!nombre) return ['Nombre es requerido', undefined];
        return [undefined, new UpdateVariedadDto(
            id_variedad,
            nombre
        )];
    }
}