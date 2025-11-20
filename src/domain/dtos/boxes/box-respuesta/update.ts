import { Molienda } from "@prisma/client";

export class UpdateBoxRespuestaDto {
  private constructor(
    public readonly id_respuesta?: string,
    public readonly molienda_1?: Molienda,
    public readonly molienda_2?: Molienda,
    public readonly molienda_3?: Molienda,
    public readonly tueste_1?: string,
    public readonly tueste_2?: string,
    public readonly tueste_3?: string,
    public readonly id_cafe_elegido?: string,
  ) {}

  get values() {
    const obj: any = {};

    if (this.molienda_1) obj.molienda_1 = this.molienda_1;
    if (this.molienda_2) obj.molienda_2 = this.molienda_2;
    if (this.molienda_3) obj.molienda_3 = this.molienda_3;

    if (this.tueste_1) obj.tueste_1 = this.tueste_1;
    if (this.tueste_2) obj.tueste_2 = this.tueste_2;
    if (this.tueste_3) obj.tueste_3 = this.tueste_3;

    if (this.id_cafe_elegido) obj.id_cafe_elegido = this.id_cafe_elegido;

    return obj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateBoxRespuestaDto?] {
    const {
      id_respuesta,
      molienda_1,
      molienda_2,
      molienda_3,
      tueste_1,
      tueste_2,
      tueste_3,
      id_cafe_elegido,
    } = props;

    return [
      undefined,
      new UpdateBoxRespuestaDto(
        id_respuesta,
        molienda_1,
        molienda_2,
        molienda_3,
        tueste_1,
        tueste_2,
        tueste_3,
        id_cafe_elegido,
      )
    ];
  }
}
