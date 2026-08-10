import { Request, Response } from "express";
import { PaqueteRepository } from "../../domain/repository/paquete.repository";
import { PaqueteItemRepository } from "../../domain/repository/paquete-item.repository";
import { InventarioGenericoRepository } from "../../domain/repository/inventario-generico.repository";
import { CreatePaqueteDto } from "../../domain/dtos/paquete/create";
import { CreatePaqueteItemDto } from "../../domain/dtos/paquete-item/create";
import { MarcarListoPaqueteDto } from "../../domain/dtos/paquete/marcar-listo";
import { CancelarPaqueteDto } from "../../domain/dtos/paquete/cancelar";
import { CrearPaquete } from "../../domain/usecases/paquete/crear-paquete";
import { AgregarItemPaquete } from "../../domain/usecases/paquete/agregar-item";
import { EliminarItemPaquete } from "../../domain/usecases/paquete/eliminar-item";
import { MarcarListoPaquete } from "../../domain/usecases/paquete/marcar-listo";
import { CancelarPaquete } from "../../domain/usecases/paquete/cancelar-paquete";
import { GetPaquete } from "../../domain/usecases/paquete/get-paquete";
import { GetPaquetes } from "../../domain/usecases/paquete/get-paquetes";
import { GetPaqueteByPedidoOrigen } from "../../domain/usecases/paquete/get-pedido";

export class PaqueteController {
    constructor(
        private readonly paqueteRepo: PaqueteRepository,
        private readonly paqueteItemRepo: PaqueteItemRepository,
        private readonly inventarioRepo: InventarioGenericoRepository,
    ) { }

    public create = (req: Request, res: Response) => {
        if (!req.user?.id_user) return res.status(401).json({ error: 'Usuario no autenticado' });

        const [error, dto] = CreatePaqueteDto.create({
            ...req.body,
            creado_por_id: req.body.creado_por_id ?? req.user.id_user,
        });
        if (error) return res.status(400).json({ error });

        new CrearPaquete(this.paqueteRepo)
            .execute(dto!)
            .then(paquete => res.json(paquete))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public addItem = (req: Request, res: Response) => {
        const [error, dto] = CreatePaqueteItemDto.create({
            ...req.body,
            id_paquete: req.params.id,
        });
        if (error) return res.status(400).json({ error });

        new AgregarItemPaquete(this.paqueteRepo, this.paqueteItemRepo, this.inventarioRepo)
            .execute(dto!)
            .then(item => res.json(item))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public deleteItem = (req: Request, res: Response) => {
        new EliminarItemPaquete(this.paqueteRepo, this.paqueteItemRepo)
            .execute(req.params.id_item)
            .then(item => res.json(item))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public marcarListo = (req: Request, res: Response) => {
        if (!req.user?.id_user) return res.status(401).json({ error: 'Usuario no autenticado' });

        const [error, dto] = MarcarListoPaqueteDto.create({
            preparado_por_id: req.body.preparado_por_id ?? req.user.id_user,
        });
        if (error) return res.status(400).json({ error });

        new MarcarListoPaquete(this.paqueteRepo, this.paqueteItemRepo, this.inventarioRepo)
            .execute(req.params.id, dto!)
            .then(paquete => res.json(paquete))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public cancelar = (req: Request, res: Response) => {
        if (!req.user?.id_user) return res.status(401).json({ error: 'Usuario no autenticado' });

        const [error, dto] = CancelarPaqueteDto.create({
            cancelado_por_id: req.body.cancelado_por_id ?? req.user.id_user,
            comentario: req.body.comentario,
        });
        if (error) return res.status(400).json({ error });

        new CancelarPaquete(this.paqueteRepo)
            .execute(req.params.id, dto!)
            .then(paquete => res.json(paquete))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public getById = (req: Request, res: Response) => {
        new GetPaquete(this.paqueteRepo)
            .execute(req.params.id)
            .then(paquete => res.json(paquete))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public getAll = (req: Request, res: Response) => {
        const incluirEliminados = req.query.incluirEliminados === 'true';
        new GetPaquetes(this.paqueteRepo)
            .execute(incluirEliminados)
            .then(paquetes => res.json(paquetes))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public getByPedidoOrigen = (req: Request, res: Response) => {
        new GetPaqueteByPedidoOrigen(this.paqueteRepo)
            .execute(req.params.id_pedido)
            .then(paquete => res.json(paquete))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };
}
