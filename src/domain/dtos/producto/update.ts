export class UpdateProductoDto {
    private constructor(
        public readonly id_producto?: string,
        public readonly nombre?: string,
        public readonly descripcion?: string,
        public readonly categoria?: string,
        public readonly es_combo?: boolean,
        public readonly activo?: boolean,
    ) {}

    get values() {
        const obj: { [key: string]: any } = {};
        if (this.nombre) obj.nombre = this.nombre;
        if (this.descripcion) obj.descripcion = this.descripcion;
        if (this.categoria) obj.categoria = this.categoria;
        if (this.es_combo !== undefined) obj.es_combo = this.es_combo;
        if (this.activo !== undefined) obj.activo = this.activo;
        return obj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateProductoDto?] {
        const {
            id_producto,
            nombre,
            descripcion,
            categoria,
            es_combo,
            activo,
        } = props;

        return [
            undefined,
            new UpdateProductoDto(id_producto, nombre, descripcion, categoria, es_combo, activo)
        ];
    }
}