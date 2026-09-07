export class CreateMuestraDto {
    private constructor(
        public readonly id_muestra: string,
        public readonly owned_by_store: boolean,
        public readonly proveedor: string,
        public readonly nombre_muestra: string,
        public readonly productor: string,
        public readonly finca: string,
        public readonly distrito: string,
        public readonly departamento: string,
        public readonly peso: number,
        public readonly variedades: string[],
        public readonly proceso: string,
        public readonly id_user?: string,
        public readonly id_analisis?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateMuestraDto?] {
        let {
            id_muestra, owned_by_store, proveedor, nombre_muestra, productor,
            finca, distrito, departamento, peso, variedades, proceso, id_user, id_analisis,
        } = props;

        if (!productor) return ['El productor es requerido', undefined];
        if (!finca) return ['La finca es requerida', undefined];
        if (!distrito) return ['La provincia es requerida', undefined];
        if (!departamento) return ['El departamento es requerido', undefined];
        if (!peso || peso <= 0) return ['El peso debe ser mayor a 0', undefined];
        if (!variedades) return ['Las variedades son requeridas', undefined];
        if (!proceso) return ['El proceso es requerido', undefined];

        const esOwnedByStore = !!owned_by_store;

        // Nunca ambos, nunca ninguno — siempre se especifica explícitamente.
        if (esOwnedByStore && id_user) {
            return ['Una muestra no puede ser de tienda y de cliente al mismo tiempo', undefined];
        }
        if (!esOwnedByStore && !id_user) {
            return ['Debes indicar si la muestra es de tienda (owned_by_store) o de un cliente (id_user)', undefined];
        }

        return [undefined, new CreateMuestraDto(
            id_muestra,
            esOwnedByStore,
            proveedor,
            nombre_muestra,
            productor,
            finca,
            distrito,
            departamento,
            peso,
            variedades,
            proceso,
            esOwnedByStore ? undefined : id_user,
            id_analisis,
        )];
    }
}