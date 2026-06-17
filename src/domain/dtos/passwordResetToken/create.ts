export class CreatePasswordResetTokenDto {
  private constructor(
    public readonly id_user: string,
    public readonly token: string,
    public readonly fecha_expira: Date,
    public readonly ip_solicitud?: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreatePasswordResetTokenDto?] {
    const { id_user, token, fecha_expira, ip_solicitud } = object;

    if (!id_user) return ['El id_user es requerido'];
    if (!token) return ['El token es requerido'];
    if (!fecha_expira) return ['La fecha de expiración es requerida'];

    return [undefined, new CreatePasswordResetTokenDto(id_user, token, new Date(fecha_expira), ip_solicitud)];
  }
}