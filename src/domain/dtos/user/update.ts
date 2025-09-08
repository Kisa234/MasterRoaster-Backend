export class UpdateUserDto {
    private constructor(
        public readonly fecha_editado: Date = new Date(),
        public readonly id_user: string,
        public readonly nombre?: string,
        public readonly nombre_comercial?: string,
        public readonly email?: string,
        public readonly documento_tipo?: string,
        public readonly documento_identidad?: string,
        public readonly fecha_nacimiento?: Date,
        public readonly departamento?: string,
        public readonly direccion?: string,
        public readonly numero_telefono?: number,
        public readonly rol?: string,
        public readonly password?: string,

    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.fecha_editado) returnObj.fecha_editado = this.fecha_editado;
        if (this.id_user) returnObj.id_user = this.id_user;
        if (this.nombre) returnObj.nombre = this.nombre;
        if (this.nombre_comercial) returnObj.nombre_comercial = this.nombre_comercial;
        if (this.email) returnObj.email = this.email;
        if (this.documento_tipo) returnObj.documento_tipo = this.documento_tipo;
        if (this.documento_identidad) returnObj.documento_identidad = this.documento_identidad;
        if (this.fecha_nacimiento) returnObj.fecha_nacimiento = this.fecha_nacimiento;
        if (this.departamento) returnObj.departamento = this.departamento;
        if (this.direccion) returnObj.direccion = this.direccion;
        if (this.numero_telefono) returnObj.numero_telefono = this.numero_telefono;
        if (this.rol) returnObj.rol = this.rol;
        if (this.password) returnObj.password = this.password;

        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateUserDto?] {
        
        const { 
            fecha_editado,
            id_user,
            nombre,
            nombre_comercial,
            email,
            documento_tipo,
            documento_identidad,
            fecha_nacimiento,
            departamento,
            direccion,
            numero_telefono,
            rol,
            password
        } = props;

        return [undefined, new UpdateUserDto(
            new Date(),
            id_user,
            nombre,
            nombre_comercial,
            email,
            documento_tipo,
            documento_identidad,
            fecha_nacimiento,
            departamento,
            direccion,
            numero_telefono,
            rol,
            password
        )];
    }
}
