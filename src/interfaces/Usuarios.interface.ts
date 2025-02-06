export interface Usuarios {
    id_usuario: string;
    nombre: string;
    email: string;
    numero_telefono: string;
    rol: string;
    tostador?: string;
    contrasena_hash: string;
    fecha_creacion: Date;
    eliminado: boolean;
}