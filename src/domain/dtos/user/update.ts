export class UpdateUserDto {
    private constructor(
        public readonly fecha_editado: Date = new Date(),
        public readonly id_user: string,
        public readonly nombre?: string,
        public readonly email?: string,
        public readonly rol?: string,
        public readonly password?: string,

    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.fecha_editado) returnObj.fecha_editado = this.fecha_editado;
        if (this.nombre) returnObj.nombre = this.nombre;
        if (this.email) returnObj.email = this.email;
        if (this.rol) returnObj.rol = this.rol;
        if (this.password) returnObj.password = this.password;

        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateUserDto?] {
        const { id_user, nombre, email, rol, password, eliminado,  } = props;
        return [undefined, new UpdateUserDto(
            new Date(),
            id_user,
            nombre,
            email,
            rol,
            password
        )];
    }
}
