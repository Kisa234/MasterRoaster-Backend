
export class CompleteTuesteDto {
    private constructor(
        public readonly id_tueste                :string,
        public readonly peso_salida              :number,
        public readonly merma                    :number,
        public readonly agtrom_comercial         :number,
        public readonly agtrom_gourmet           :number,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.peso_salida !== undefined) returnObj.peso_salida = this.peso_salida;
        if (this.merma !== undefined) returnObj.merma = this.merma;
        if (this.agtrom_comercial !== undefined) returnObj.agtrom_comercial = this.agtrom_comercial;
        if (this.agtrom_gourmet !== undefined) returnObj.agtrom_gourmet = this.agtrom_gourmet;
        returnObj.estado_tueste = "Completado";
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, CompleteTuesteDto?] {
         const {
            id_tueste,
            peso_salida,
            merma,
            agtrom_comercial,
            agtrom_gourmet
        } = props.tueste;
        
        if (!id_tueste) return ['ID de tueste es requerido', undefined];
        if (!peso_salida) return ['Peso de salida es requerido', undefined];
        if (!merma) return ['Merma es requerido', undefined];
        if (!agtrom_comercial) return ['Agtrom comercial es requerido', undefined];
        if (!agtrom_gourmet) return ['Agtrom gourmet es requerido', undefined];

        return [undefined, new CompleteTuesteDto(
            id_tueste,
            peso_salida,
            merma,
            agtrom_comercial,
            agtrom_gourmet  
        )];
    }
}
