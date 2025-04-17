import { AnalisisEntity } from "../../../entities/analisis.entity";

export class UpdateLoteDto {
    private constructor(
        public readonly productor?: string,
        public readonly finca?: string,
        public readonly region?: string,
        public readonly departamento?: string,
        public readonly peso?: number,
        public readonly proceso?: string,
        public readonly variedades?: string,
        public readonly user_id?: string,
        public readonly analisis_id?: string,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.productor) returnObj.productor = this.productor;
        if (this.finca) returnObj.finca = this.finca;
        if (this.region) returnObj.region = this.region;
        if (this.departamento) returnObj.departamento = this.departamento;
        if (this.peso) returnObj.peso = this.peso;
        if (this.variedades) returnObj.variedades = this.variedades;
        if (this.proceso) returnObj.proceso = this.proceso;
        if (this.user_id) returnObj.user_id_user = this.user_id;
        if (this.analisis_id) returnObj.analisis_id = this.analisis_id;


        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateLoteDto?] {
        const { productor, finca, region, departamento, peso, 
                 user_id,variedades,proceso, analisis_id } = props;

        return [undefined, 
            new UpdateLoteDto(
                productor,
                finca, 
                region, 
                departamento, 
                peso, 
                user_id, 
                variedades, 
                proceso,
                analisis_id
        )];
    }
}
