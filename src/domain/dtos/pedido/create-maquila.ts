import { CreatePedidoDto } from "./create";

export interface BolsaItemDto {
    gramaje: number;
    molienda: string;
    cantidad: number;
}

export class CreateMaquilaDto {
    private constructor(
        public readonly pedido: CreatePedidoDto,  
        public readonly bolsas: BolsaItemDto[],   
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateMaquilaDto?] {
        const { bolsas } = props;

        // Primero crear el CreatePedidoDto base
        const [errPedido, pedidoDto] = CreatePedidoDto.create(props);
        if (errPedido || !pedidoDto) return [errPedido, undefined];

        // Validar bolsas
        if (!bolsas || bolsas.length === 0)
            return ['Debe indicar al menos una combinación de bolsas', undefined];

        for (const [i, b] of bolsas.entries()) {
            if (!b.gramaje || b.gramaje <= 0) return [`bolsas[${i}]: gramaje debe ser mayor a 0`, undefined];
            if (!b.molienda) return [`bolsas[${i}]: molienda es requerida`, undefined];
            if (!b.cantidad || b.cantidad <= 0) return [`bolsas[${i}]: cantidad debe ser mayor a 0`, undefined];
        }

        // Validar suma de unidades == cantidad del pedido
        const totalUnidades = bolsas.reduce((acc: number, b: BolsaItemDto) => acc + b.cantidad, 0);
        if (totalUnidades !== props.cantidad) {
            return [`La suma de bolsas (${totalUnidades}) no coincide con la cantidad del pedido (${props.cantidad})`, undefined];
        }

        return [undefined, new CreateMaquilaDto(pedidoDto, bolsas)];
    }
}