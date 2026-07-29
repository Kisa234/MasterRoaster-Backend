import { Request, Response } from "express";
import { BolsaRepository } from "../../domain/repository/bolsa.repository";
import { InventarioBolsaRepository } from "../../domain/repository/inventarioBolsa.repository";
import { CreateBolsaDto } from "../../domain/dtos/bolsa/create";
import { UpdateBolsaDto } from "../../domain/dtos/bolsa/update";
import { CreateBolsa } from "../../domain/usecases/bolsa/create-bolsa";
import { GetBolsaById } from "../../domain/usecases/bolsa/get-bolsa";
import { GetBolsas } from "../../domain/usecases/bolsa/get-bolsas";
import { GetBolsasByPedidoId } from "../../domain/usecases/bolsa/get-bolsas-pedido";
import { GetBolsasByLoteTostadoId } from "../../domain/usecases/bolsa/get-bolsas-lote-tostado";
import { GetBolsaInventario } from "../../domain/usecases/bolsa/get-bolsa-inventario";
import { GetBolsaInventarioById } from "../../domain/usecases/bolsa/get-bolsa-inventario-id";
import { UpdateBolsa } from "../../domain/usecases/bolsa/update-bolsa";
import { DeleteBolsa } from "../../domain/usecases/bolsa/delete-bolsa";

export class BolsaController {

    constructor(
        private readonly bolsaRepository: BolsaRepository,
        private readonly inventarioBolsaRepository: InventarioBolsaRepository,
    ) { }

    public createBolsa = (req: Request, res: Response) => {
        if (!req.user?.id_user) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const [error, createBolsaDto] = CreateBolsaDto.create({
            ...req.body,
            id_user: req.body.id_user ?? req.user.id_user,
        });
        if (error) return res.status(400).json({ error });

        new CreateBolsa(this.bolsaRepository, this.inventarioBolsaRepository)
            .execute(createBolsaDto!)
            .then(bolsa => res.json(bolsa))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }

    public updateBolsa = (req: Request, res: Response) => {
        const [error, updateBolsaDto] = UpdateBolsaDto.update(req.body);
        if (error) return res.status(400).json({ error });

        new UpdateBolsa(this.bolsaRepository)
            .execute(req.params.id, updateBolsaDto!)
            .then(bolsa => res.json(bolsa))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }

    public deleteBolsa = (req: Request, res: Response) => {
        new DeleteBolsa(this.bolsaRepository)
            .execute(req.params.id)
            .then(bolsa => res.json(bolsa))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }

    public getBolsaById = (req: Request, res: Response) => {
        new GetBolsaById(this.bolsaRepository)
            .execute(req.params.id)
            .then(bolsa => res.json(bolsa))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }

    public getBolsas = (req: Request, res: Response) => {
        new GetBolsas(this.bolsaRepository)
            .execute()
            .then(bolsas => res.json(bolsas))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }

    public getBolsasByPedidoId = (req: Request, res: Response) => {
        new GetBolsasByPedidoId(this.bolsaRepository)
            .execute(req.params.id)
            .then(bolsas => res.json(bolsas))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }

    public getBolsasByLoteTostadoId = (req: Request, res: Response) => {
        new GetBolsasByLoteTostadoId(this.bolsaRepository)
            .execute(req.params.id)
            .then(bolsas => res.json(bolsas))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }

    public getBolsaInventario = (req: Request, res: Response) => {
        const incluirEliminados = req.query.incluirEliminados === 'true';
        new GetBolsaInventario(this.bolsaRepository)
            .execute(incluirEliminados)
            .then(bolsas => res.json(bolsas))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }

    public getBolsaInventarioById = (req: Request, res: Response) => {
        new GetBolsaInventarioById(this.bolsaRepository)
            .execute(req.params.id)
            .then(bolsa => res.json(bolsa))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }
}