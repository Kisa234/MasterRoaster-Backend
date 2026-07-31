import { Request, Response } from "express";
import { PedidoBolsaRepository } from "../../domain/repository/pedido-bolsa.repository";
import { PedidoRepository } from "../../domain/repository/pedido.repository";
import { CreatePedidoBolsaDto } from "../../domain/dtos/pedido-bolsa/create";
import { UpdatePedidoBolsaDto } from "../../domain/dtos/pedido-bolsa/update";
import { CreatePedidoBolsa } from "../../domain/usecases/pedido-bolsa/create-pedido-bolsa";
import { UpdatePedidoBolsa } from "../../domain/usecases/pedido-bolsa/update-pedido-bolsa";
import { DeletePedidoBolsa } from "../../domain/usecases/pedido-bolsa/delete-pedido-bolsa";
import { GetPedidoBolsasByPedido } from "../../domain/usecases/pedido-bolsa/get-by-pedido";
import { GetPedidoBolsasByGramaje } from "../../domain/usecases/pedido-bolsa/get-by-gramaje";
import { GetPedidoBolsasByMolienda } from "../../domain/usecases/pedido-bolsa/get-by-molienda";

export class PedidoBolsaController {

    constructor(
        private readonly pedidoBolsaRepository: PedidoBolsaRepository,
        private readonly pedidoRepository: PedidoRepository,
    ) { }

    public createPedidoBolsa = async (req: Request, res: Response) => {
        try {
            const pedido = await this.pedidoRepository.getPedidoById(req.params.id_pedido);
            if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
            if (pedido.estado_pedido !== 'Pendiente') {
                return res.status(400).json({ error: 'Solo se pueden agregar bolsas a pedidos Pendientes' });
            }
            if (pedido.tipo_pedido !== 'Maquila') {
                return res.status(400).json({ error: 'Solo pedidos de Maquila tienen bolsas' });
            }

            const [error, dto] = CreatePedidoBolsaDto.create({
                ...req.body,
                id_pedido: req.params.id_pedido,
            });
            if (error) return res.status(400).json({ error });

            const item = await new CreatePedidoBolsa(this.pedidoBolsaRepository).execute(dto!);
            return res.json(item);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public updatePedidoBolsa = async (req: Request, res: Response) => {
        try {
            const [error, dto] = UpdatePedidoBolsaDto.update(req.body);
            if (error) return res.status(400).json({ error });

            const item = await new UpdatePedidoBolsa(this.pedidoBolsaRepository)
                .execute(req.params.id, dto!);
            return res.json(item);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public deletePedidoBolsa = async (req: Request, res: Response) => {
        try {
            const item = await new DeletePedidoBolsa(this.pedidoBolsaRepository)
                .execute(req.params.id);
            return res.json(item);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public getByPedido = async (req: Request, res: Response) => {
        try {
            const items = await new GetPedidoBolsasByPedido(this.pedidoBolsaRepository)
                .execute(req.params.id_pedido);
            return res.json(items);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public getByGramaje = async (req: Request, res: Response) => {
        try {
            const gramaje = parseInt(req.params.gramaje);
            if (isNaN(gramaje)) return res.status(400).json({ error: 'gramaje debe ser un número' });

            const items = await new GetPedidoBolsasByGramaje(this.pedidoBolsaRepository)
                .execute(gramaje);
            return res.json(items);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public getByMolienda = async (req: Request, res: Response) => {
        try {
            const items = await new GetPedidoBolsasByMolienda(this.pedidoBolsaRepository)
                .execute(req.params.molienda);
            return res.json(items);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };
}
