import { LoteEntity } from "../../entities/lote.entity";
import { PedidoEntity } from '../../entities/pedido.entity';
import { MuestraEntity } from '../../entities/muestra.entity';
import { Encryption } from "../../../config/bcrypt";

export class CreateUserDto {
    private constructor(
        public readonly nombre: string,
        public readonly email: string,
        public readonly rol: string,
        public readonly password: string,
        public readonly numero_telefono: string,
        public readonly fecha_editado?: Date | null,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateUserDto?] {
        let { nombre, email, rol, password, numero_telefono} = props;

        if (!nombre) return ['Nombre es requerido', undefined];
        if (!email) return ['Email es requerido', undefined];
        if (!rol) return ['Rol es requerido', undefined];
        if (!password) return ['Contraseña es requerida', undefined];
        if (!numero_telefono) return ['Número de teléfono es requerido', undefined];

        password = Encryption.hashPassword(password);

        return [undefined, new CreateUserDto(nombre, email, rol, password, numero_telefono)];
    }
}
