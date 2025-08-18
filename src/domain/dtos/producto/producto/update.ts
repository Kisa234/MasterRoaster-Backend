export class UpdateProductoDto {
    private constructor(
        public readonly nombre?: string,
        public readonly descripcion?: string,
        public readonly activo?: boolean,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.nombre) returnObj.nombre = this.nombre;
        if (this.descripcion) returnObj.descripcion = this.descripcion;

        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateProductoDto?] {
        let {
            nombre,
            descripcion,
        } = props;


        return [undefined, new UpdateProductoDto(
            nombre,
            descripcion
        )];
    }
}
