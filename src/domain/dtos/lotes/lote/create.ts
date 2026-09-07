export class CreateLoteDto {
    private constructor(
        public readonly id_lote: string,
        public readonly productor: string,
        public readonly finca: string,
        public readonly distrito: string,
        public readonly departamento: string,
        public readonly peso: number,
        public readonly variedades: string[],
        public readonly proceso: string,
        public readonly tipo_lote: string,
        public readonly owned_by_store: boolean,
        public readonly clasificacion?: string,
        public readonly costo?: number,
        public readonly altura?: number,
        public readonly id_user?: string,
        public readonly peso_tostado?: number,
        public readonly proveedor?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateLoteDto?] {
        let {
            id_lote, proveedor, productor, finca, distrito, departamento, peso,
            variedades, proceso, tipo_lote, owned_by_store, clasificacion,
            costo, altura, id_user, peso_tostado,
        } = props;

        if (!productor) return ['El productor es requerido', undefined];
        if (!finca) return ['La finca es requerida', undefined];
        if (!departamento) return ['El departamento es requerido', undefined];
        if (!distrito) return ['El distrito es requerido', undefined];
        if (!peso || peso <= 0) return ['El peso debe ser mayor a 0', undefined];
        if (!variedades) return ['Las variedades son requeridas', undefined];
        if (!proceso) return ['El proceso es requerido', undefined];

        const esOwnedByStore = !!owned_by_store;

        if (esOwnedByStore && id_user) {
            return ['Un lote no puede ser de tienda y de cliente al mismo tiempo', undefined];
        }
        if (!esOwnedByStore && !id_user) {
            return ['Debes indicar si el lote es de tienda (owned_by_store) o de un cliente (id_user)', undefined];
        }

        return [undefined, new CreateLoteDto(
            id_lote, productor, finca, distrito, departamento, peso, variedades,
            proceso, tipo_lote, esOwnedByStore, clasificacion, costo, altura,
            esOwnedByStore ? undefined : id_user, peso_tostado, proveedor,
        )];
    }

}