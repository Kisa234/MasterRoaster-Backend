export class UpdateInventarioBolsaDto {
    private constructor(
        public readonly cantidad?: number,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.cantidad !== undefined) returnObj.cantidad = this.cantidad;
        returnObj.fecha_editado = new Date();
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateInventarioBolsaDto?] {
        let { cantidad } = props;

        if (cantidad !== undefined && cantidad < 0) {
            return ['cantidad no puede ser negativa', undefined];
        }

        return [undefined, new UpdateInventarioBolsaDto(cantidad)];
    }
}