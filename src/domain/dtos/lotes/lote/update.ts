import { AnalisisEntity } from "../../../entities/analisis.entity";

export class UpdateLoteDto {
    private constructor(
        public readonly productor?: string,
        public readonly finca?: string,
        public readonly region?: string,
        public readonly departamento?: string,
        public readonly peso?: number,
        public readonly variedades?: string,
        public readonly proceso?: string,
        public readonly id_user?: string,
        public readonly id_analisis?: string,
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
        if (this.id_user) returnObj.user_id_user = this.id_user;
        if (this.id_analisis) returnObj.analisis_id = this.id_analisis;


        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateLoteDto?] {
        const { productor, finca, region, departamento, peso, 
            id_user,variedades,proceso, id_analisis } = props;

        return [undefined, 
            new UpdateLoteDto(
                productor,
                finca, 
                region, 
                departamento, 
                peso, 
                variedades, 
                proceso,
                id_user, 
                id_analisis
        )];
    }
}
