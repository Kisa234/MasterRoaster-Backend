// undefined → no se toca ; '' / null → se limpia (null) ; otro → Number (puede dar NaN, se valida abajo)
const toNullableInt = (v: any): number | null | undefined =>
    v === undefined ? undefined : v === null || v === '' ? null : Number(v);

export class UpdateLoteDto {
    private constructor(
        public readonly proveedor?: string,
        public readonly productor?: string,
        public readonly finca?: string,
        public readonly distrito?: string,
        public readonly departamento?: string,
        public readonly peso?: number,
        public readonly variedades?: string[],
        public readonly proceso?: string,
        public readonly tipo_lote?: string,
        public readonly clasificacion?: string,
        public readonly costo?: number,
        public readonly altura?: number | null,
        public readonly id_user?: string,
        public readonly id_analisis?: string,
        public readonly peso_tostado?: number,
        public readonly provincia?: string | null,
        public readonly anio_cosecha?: number | null,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.productor) returnObj.productor = this.productor;
        if (this.finca) returnObj.finca = this.finca;
        if (this.distrito) returnObj.distrito = this.distrito;
        if (this.departamento) returnObj.departamento = this.departamento;
        if (this.variedades) returnObj.variedades = this.variedades;
        if (this.proceso) returnObj.proceso = this.proceso;
        if (this.tipo_lote) returnObj.tipo_lote = this.tipo_lote;
        if (this.id_analisis) returnObj.id_analisis = this.id_analisis;
        if (this.peso !== undefined) returnObj.peso = this.peso;
        if (this.peso_tostado !== undefined) returnObj.peso_tostado = this.peso_tostado;
        if (this.clasificacion) returnObj.clasificacion = this.clasificacion;
        if (this.costo !== undefined) returnObj.costo = this.costo;
        if (this.altura !== undefined) returnObj.altura = this.altura;
        if (this.provincia !== undefined) returnObj.provincia = this.provincia;
        if (this.anio_cosecha !== undefined) returnObj.anio_cosecha = this.anio_cosecha;

        return returnObj;
    }


    static update(props: { [key: string]: any }): [string?, UpdateLoteDto?] {
        let {
            proveedor,
            productor,
            finca,
            distrito,
            departamento,
            peso,
            variedades,
            proceso,
            tipo_lote,
            clasificacion,
            costo,
            altura,
            id_user,
            id_analisis,
            peso_tostado,
            provincia,
            anio_cosecha,
        } = props;

        const alturaNum = toNullableInt(altura);
        if (typeof alturaNum === 'number' && (!Number.isInteger(alturaNum) || alturaNum <= 0)) {
            return ['La altitud debe ser un número entero mayor a 0', undefined];
        }

        const anioNum = toNullableInt(anio_cosecha);
        const anioMax = new Date().getFullYear() + 1;
        if (typeof anioNum === 'number' && (!Number.isInteger(anioNum) || anioNum < 2000 || anioNum > anioMax)) {
            return [`El año de cosecha debe estar entre 2000 y ${anioMax}`, undefined];
        }

        // provincia: undefined = no se toca, '' o null = se limpia
        const provinciaFinal = provincia === undefined
            ? undefined
            : (typeof provincia === 'string' && provincia.trim()) ? provincia.trim() : null;

        return [undefined,
            new UpdateLoteDto(
                proveedor,
                productor,
                finca,
                distrito,
                departamento,
                peso,
                variedades,
                proceso,
                tipo_lote,
                clasificacion,
                costo,
                alturaNum,
                id_user,
                id_analisis,
                peso_tostado,
                provinciaFinal,
                anioNum,
            )];
    }
}