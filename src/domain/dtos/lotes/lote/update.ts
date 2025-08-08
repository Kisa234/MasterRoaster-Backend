export class UpdateLoteDto {
    private constructor(
        public readonly proveedor?: string,
        public readonly productor?: string,
        public readonly finca?: string,
        public readonly distrito?: string,
        public readonly departamento?: string,
        public readonly peso?: number,
        public readonly variedades?: string,
        public readonly proceso?: string,
        public readonly tipo_lote?: string,
        public readonly clasificacion?: string,
        public readonly id_user?: string,
        public readonly id_analisis?: string,
        public readonly peso_tostado?: number,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.productor) returnObj.productor = this.productor;
        if (this.finca) returnObj.finca = this.finca;
        if (this.distrito) returnObj.region = this.distrito;
        if (this.departamento) returnObj.departamento = this.departamento;
        if (this.variedades) returnObj.variedades = this.variedades;
        if (this.proceso) returnObj.proceso = this.proceso;
        if (this.tipo_lote) returnObj.tipo_lote = this.tipo_lote;
        if (this.id_user) returnObj.user_id = this.id_user;
        if (this.id_analisis) returnObj.id_analisis = this.id_analisis;
        if (this.peso !== undefined) returnObj.peso = this.peso;
        if (this.peso_tostado !== undefined) returnObj.peso_tostado = this.peso_tostado;

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
            id_user,
            id_analisis,
            peso_tostado,
        } = props;

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
                id_user,
                id_analisis,
                peso_tostado,
            )];
    }
}
