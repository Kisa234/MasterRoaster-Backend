import { Request, Response } from "express";

import { CreatePedidoDto } from "../../domain/dtos/pedido/create";
import { UpdatePedidoDto } from "../../domain/dtos/pedido/update";
import { PedidoRepository } from "../../domain/repository/pedido.repository";

import { CreatePedido } from "../../domain/usecases/pedido/create-pedido";
import { UpdatePedido } from "../../domain/usecases/pedido/update-pedido";
import { DeletePedido } from "../../domain/usecases/pedido/delete-pedido";
import { GetPedido } from "../../domain/usecases/pedido/get-pedido";
import { GetPedidosByEstado } from "../../domain/usecases/pedido/getByEstado-pedido";
import { GetPedidosByCliente } from "../../domain/usecases/pedido/getByCliente-pedido";
import { CompletarPedido } from "../../domain/usecases/pedido/complete-pedido";

export class PedidoController {

    constructor(
        private readonly pedidoRepository: PedidoRepository
    ) {}

    public createPedido = async (req: Request, res: Response) => {
        const idLote = req.body.id_lote;
        const [error, createPedidoDto] = CreatePedidoDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }

        new CreatePedido(this.pedidoRepository)
            .execute(createPedidoDto!)
            .then(pedido => res.json(pedido))
            .catch(error => res.status(400).json({ error }));
    };

    public updatePedido = async (req: Request, res: Response) => {
        const id_pedido = req.params.id;
        const [error, updatePedidoDto] = UpdatePedidoDto.update({ ...req.body, id: id_pedido });
        if (error) {
            return res.status(400).json({ error });
        }

        new UpdatePedido(this.pedidoRepository)
            .execute(id_pedido, updatePedidoDto!)
            .then(pedido => res.json(pedido))
            .catch(error => res.status(400).json({ error }));
    };

    public deletePedido = async (req: Request, res: Response) => {
        new DeletePedido(this.pedidoRepository)
            .execute(req.params.id)
            .then(pedido => res.json(pedido))
            .catch(error => res.status(400).json({ error }));
    };

    public getPedidoById = async (req: Request, res: Response) => {
        new GetPedido(this.pedidoRepository)
            .execute(req.params.id)
            .then(pedido => res.json(pedido))
            .catch(error => res.status(400).json({ error }));
    };

    public getPedidosByEstado = async (req: Request, res: Response) => {
        new GetPedidosByEstado(this.pedidoRepository)
            .execute(req.params.estado)
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error }));
    };

    public getPedidosByCliente = async (req: Request, res: Response) => {
        new GetPedidosByCliente(this.pedidoRepository)
            .execute(req.params.cliente_id)
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error }));
    };

    public completarPedido = async (req: Request, res: Response) => {
        new CompletarPedido(this.pedidoRepository)
            .execute(req.params.id)
            .then(pedido => res.json(pedido))
            .catch(error => res.status(400).json({ error }));
    };
}
