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
    public readonly id_user?: string ,
    public readonly id_analisis?: string 
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.productor) returnObj.productor = this.productor;
    if (this.finca) returnObj.finca = this.finca;
    if (this.region) returnObj.region = this.region;
    if (this.departamento) returnObj.departamento = this.departamento;
    if (this.peso) returnObj.peso = this.peso;
    if (this.proceso) returnObj.proceso = this.proceso;
    if (this.variedades) returnObj.variedades = this.variedades;
    if (this.id_user) returnObj.user_id = this.id_user;
    if (this.id_analisis) returnObj.id_analisis = this.id_analisis;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateMuestraDto?] {
    let {
      id_muestra,
      productor,
      finca,
      region,
      departamento,
      peso,
      proceso,
      variedades,
      id_user,
      id_analisis
    } = props;

    

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
        id_user,
        id_analisis 
      )
    ];
  }
}
