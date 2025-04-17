export function obtenerCambiosConAuditoria(
    anterior: any,
    nuevo: any,
    usuario: string,
    accion: 'UPDATE' | 'CREATE' | 'DELETE'
  ) {
    const cambios: any = {};
    for (const key in nuevo) {
      if (nuevo[key] !== undefined && nuevo[key] !== anterior[key]) {
        cambios[key] = { antes: anterior[key], despues: nuevo[key] };
      }
    }
  
    return {
      accion,
      cambiado_por: usuario,
      cambios
    };
}
  