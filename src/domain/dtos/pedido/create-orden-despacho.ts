import { CreatePedidoDto } from "./create";

export interface PedidoItemInputDto {
    entidad: string;
    id_entidad: string;
    cantidad: number;
}

export class CreateOrdenDespachoDto {
    private constructor(
        public readonly pedido: CreatePedidoDto,
        public readonly items: PedidoItemInputDto[],
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateOrdenDespachoDto?] {
        const { items } = props;

        const [errBase, baseDto] = CreatePedidoDto.create(props);
        if (errBase || !baseDto) return [errBase, undefined];

        if (!items || !Array.isArray(items) || items.length === 0)
            return ['Debe indicar al menos un artículo para la orden de despacho', undefined];

        for (const [i, it] of items.entries()) {
            if (!it.entidad) return [`items[${i}]: entidad es requerida`, undefined];
            if (!it.id_entidad) return [`items[${i}]: id_entidad es requerido`, undefined];
            if (it.cantidad === undefined || it.cantidad === null || it.cantidad <= 0)
                return [`items[${i}]: cantidad debe ser mayor a 0`, undefined];
        }

        return [undefined, new CreateOrdenDespachoDto(baseDto, items)];
    }
}