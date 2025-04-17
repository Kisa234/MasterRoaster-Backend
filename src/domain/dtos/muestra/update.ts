import { AnalisisEntity } from "../../entities/analisis.entity";

export class UpdateMuestraDto {
  private constructor(
    public readonly id_muestra: string,
    public readonly productor?: string,
    public readonly finca?: string,
    public readonly region?: string,
    public readonly departamento?: string,
    public readonly peso?: number,
    public readonly proceso?: string,
    public readonly variedades?: string,
    public readonly id_user?: string,
    public readonly analisis_id?: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.productor) returnObj.productor = this.productor;
    if (this.finca) returnObj.finca = this.finca;
    if (this.region) returnObj.region = this.region;
    if (this.departamento) returnObj.departamento = this.departamento;
    if (this.peso !== undefined) returnObj.peso = this.peso;
    if (this.variedades) returnObj.variedades = this.variedades;
    if (this.proceso) returnObj.proceso = this.proceso;
    if (this.id_user) returnObj.user_id = this.id_user;
    if (this.analisis_id) returnObj.analisis_id = this.analisis_id;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateMuestraDto?] {
    const {
      id_muestra,
      productor,
      finca,
      region,
      departamento,
      peso,
      proceso,
      variedades,
      user_id,
      analisis_id
    } = props;

    if (!id_muestra) return ['El ID de la muestra es requerido', undefined];

    return [
      undefined,
      new UpdateMuestraDto(
        id_muestra,
        productor,
        finca,
        region,
        departamento,
        peso,
        proceso,
        variedades,
        user_id,
        analisis_id
      )
    ];
  }
}
