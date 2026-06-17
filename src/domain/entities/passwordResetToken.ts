export class PasswordResetTokenEntity {
  constructor(
    public id_token: string,
    public id_user: string,
    public token: string,
    public fecha_creado: Date,
    public fecha_expira: Date,
    public usado: boolean,
    public fecha_usado: Date | null,
    public ip_solicitud: string | null,
  ) {}

  public static fromObject(obj: { [key: string]: any }): PasswordResetTokenEntity {
    const {
      id_token,
      id_user,
      token,
      fecha_creado,
      fecha_expira,
      usado,
      fecha_usado,
      ip_solicitud,
    } = obj;

    if (!id_token) throw new Error('id_token property is required');
    if (!id_user) throw new Error('id_user property is required');
    if (!token) throw new Error('token property is required');
    if (!fecha_creado) throw new Error('fecha_creado property is required');
    if (!fecha_expira) throw new Error('fecha_expira property is required');
    if (usado === undefined || usado === null) throw new Error('usado property is required');

    return new PasswordResetTokenEntity(
      id_token,
      id_user,
      token,
      new Date(fecha_creado),
      new Date(fecha_expira),
      usado,
      fecha_usado ? new Date(fecha_usado) : null,
      ip_solicitud ?? null,
    );
  }
}