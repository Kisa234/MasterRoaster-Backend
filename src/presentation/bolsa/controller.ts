import { Request, Response } from "express";
import { BolsaRepository } from "../../domain/repository/bolsa.repository";
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
import { InventarioBolsaRepository } from "../../domain/repository/inventario-bolsa.repository";
import { GetBolsasOwnedByStore } from "../../domain/usecases/bolsa/get-bolsas-owned-by-store";
import { GetBolsasByUserId } from "../../domain/usecases/bolsa/get-bolsas-user";

export class BolsaController {

    constructor(
        private readonly bolsaRepository: BolsaRepository,
        private readonly inventarioBolsaRepository: InventarioBolsaRepository,
    ) { }

    public createBolsa = (req: Request, res: Response) => {
        if (!req.user?.id_user) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const idUserFromBody = req.body.id_user as string | undefined;
        const ownedByStoreFromBody = req.body.owned_by_store === true;

        if (ownedByStoreFromBody && idUserFromBody) {
            return res.status(400).json({
                error: 'Una bolsa no puede ser de tienda y de cliente al mismo tiempo'
            });
        }

        let effectiveUserId: string | undefined;
        if (ownedByStoreFromBody) {
            effectiveUserId = undefined;
        } else if (idUserFromBody) {
            effectiveUserId = idUserFromBody;
        } else {
            return res.status(400).json({
                error: 'Debes indicar si la bolsa es de tienda (owned_by_store) o seleccionar un cliente (id_user)'
            });
        }

        const [error, createBolsaDto] = CreateBolsaDto.create({
            ...req.body,
            owned_by_store: ownedByStoreFromBody,
            id_user: effectiveUserId,
        });
        if (error) return res.status(400).json({ error });

        new CreateBolsa(this.bolsaRepository)
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

    public getBolsasOwnedByStore = (req: Request, res: Response) => {
        const incluirEliminados = req.query.incluirEliminados === 'true';
        new GetBolsasOwnedByStore(this.bolsaRepository)
            .execute(incluirEliminados)
            .then(bolsas => res.json(bolsas))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }

    public getBolsasByUserId = (req: Request, res: Response) => {
        const incluirEliminados = req.query.incluirEliminados === 'true';
        new GetBolsasByUserId(this.bolsaRepository)
            .execute(req.params.id, incluirEliminados)
            .then(bolsas => res.json(bolsas))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }
}