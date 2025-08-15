

export class UserEntity {
    constructor(
        public id_user: string,
        public nombre: string,
        public email: string,
        public rol: string,
        public password: string,
        public numero_telefono: number,
        public eliminado: boolean,
        public fecha_registro: Date,
        public fecha_editado?: Date,
        public nombre_comercial?:string,
    ) { }

    public static fromObject(obj: { [key: string]: any }): UserEntity {
        const { id_user, nombre, email, numero_telefono, rol, password, eliminado, fecha_registro, fecha_editado,nombre_comercial } = obj;

        if (!id_user) throw new Error('id_user property is required');
        if (!nombre) throw new Error('nombre property is required');
        if (!email) throw new Error('email property is required');
        if (!numero_telefono) throw new Error('numero_telefono property is required');
        if (rol === undefined || rol === null) throw new Error('rol property is required');
        if (!password) throw new Error('password property is required');
        if (eliminado === undefined || eliminado === null) throw new Error('eliminado property is required');
        if (!fecha_registro) throw new Error('fecha_registro property is required');
        if (fecha_editado === undefined) throw new Error('fecha_editado property is required');

        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro is not a valid date');
        }

        let newFechaEditado;
        if (fecha_editado) {
            newFechaEditado = new Date(fecha_editado);
            if (isNaN(newFechaEditado.getTime())) {
                throw new Error('fecha_editado is not a valid date');
            }
        }
        

        return new UserEntity(
            id_user,
            nombre,
            email,
            rol,
            password,
            numero_telefono,
            eliminado,
            newFechaRegistro,
            newFechaEditado,
            nombre_comercial
        );
    }
}
