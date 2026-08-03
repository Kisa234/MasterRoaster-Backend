import { Request, Response } from "express";
import { PedidoItemRepository } from "../../domain/repository/pedido-item.repository";

export class PedidoItemController {
    constructor(private readonly repository: PedidoItemRepository) { }

    public getByPedido = (req: Request, res: Response) => {
        this.repository.getByPedido(req.params.id_pedido)
            .then(items => res.json(items))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };
}
