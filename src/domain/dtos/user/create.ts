import { LoteEntity } from "../../entities/lote.entity";
import { PedidoEntity } from '../../entities/pedido.entity';
import { MuestraEntity } from '../../entities/muestra.entity';

export class CreateUserDto {
    private constructor(
        public readonly nombre: string,
        public readonly email: string,
        public readonly rol: string,
        public readonly password: string,
        public readonly numero_telefono: string,
        public readonly eliminado: boolean = false,
        public readonly fecha_registro: Date = new Date(),
        public readonly fecha_editado?: Date | null,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateUserDto?] {
        const { nombre, email, rol, password, numero_telefono} = props;

        if (!nombre) return ['Nombre es requerido', undefined];
        if (!email) return ['Email es requerido', undefined];
        if (!rol) return ['Rol es requerido', undefined];
        if (!password) return ['Contraseña es requerida', undefined];
        if (!numero_telefono) return ['Número de teléfono es requerido', undefined];


        return [undefined, new CreateUserDto(nombre, email, rol, password, numero_telefono)];
    }
}
