import { Molienda } from "@prisma/client";

export class CreateBoxRespuestaDto {
  private constructor(
    public readonly id_box_template: string,
    public readonly id_user: string,
    public readonly molienda_1: Molienda,
    public readonly molienda_2: Molienda,
    public readonly molienda_3: Molienda,
    public readonly tueste_1: string,
    public readonly tueste_2: string,
    public readonly tueste_3: string,
    public readonly id_cafe_elegido: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateBoxRespuestaDto?] {
    const {
      id_box_template,
      id_user,
      molienda_1,
      molienda_2,
      molienda_3,
      tueste_1,
      tueste_2,
      tueste_3,
      id_cafe_elegido,
    } = props;

    if (!id_box_template) return ['El ID del box template es requerido', undefined];
    if (!id_user) return ['El ID del usuario es requerido', undefined];

    if (!molienda_1) return ['La molienda del café 1 es requerida', undefined];
    if (!molienda_2) return ['La molienda del café 2 es requerida', undefined];
    if (!molienda_3) return ['La molienda del café elegido es requerida', undefined];

    if (!tueste_1) return ['El tueste del café fijo 1 es requerido', undefined];
    if (!tueste_2) return ['El tueste del café fijo 2 es requerido', undefined];
    if (!tueste_3) return ['El tueste del café elegido es requerido', undefined];

    if (!id_cafe_elegido)
      return ['Debe elegir un café para la opción', undefined];

    return [
      undefined,
      new CreateBoxRespuestaDto(
        id_box_template,
        id_user,
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
