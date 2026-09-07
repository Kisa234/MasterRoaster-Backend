import { Request, Response } from "express";
import { EnvioRepository } from "../../domain/repository/envio.repository";
import { DireccionEnvioRepository } from "../../domain/repository/direccion-envio.repository";
import { PaqueteRepository } from "../../domain/repository/paquete.repository";
import { PaqueteItemRepository } from "../../domain/repository/paquete-item.repository";
import { InventarioGenericoRepository } from "../../domain/repository/inventario-generico.repository";
import { MovimientoAlmacenRepository } from "../../domain/repository/movimiento-almacen.repository";
import { HistorialRepository } from "../../domain/repository/historial.repository";

import { CreateEnvioDto } from "../../domain/dtos/envio/create";
import { ProgramarEnvioDto } from "../../domain/dtos/envio/programar";
import { DespacharEnvioDto } from "../../domain/dtos/envio/despachar";
import { ConfirmarEntregaEnvioDto } from "../../domain/dtos/envio/confirmar-entrega";
import { CancelarEnvioDto } from "../../domain/dtos/envio/cancelar";
import { RegistrarDevolucionEnvioDto } from "../../domain/dtos/envio/registrar-devolucion";

import { CrearEnvio } from "../../domain/usecases/envio/crear-envio";
import { ProgramarEnvio } from "../../domain/usecases/envio/programar-envio";
import { DespacharEnvio } from "../../domain/usecases/envio/despachar-envio";
import { ConfirmarEntregaEnvio } from "../../domain/usecases/envio/confirmar-entrega-envio";
import { CancelarEnvio } from "../../domain/usecases/envio/cancelar-envio";
import { RegistrarDevolucionEnvio } from "../../domain/usecases/envio/registrar-devolucion-envio";
import { GetEnvio } from "../../domain/usecases/envio/get-envio";
import { GetEnvios } from "../../domain/usecases/envio/get-envios";
import { GetEnviosPorEntidad } from "../../domain/usecases/envio/get-envios-por-entidad";
import { GetEnviosPorCliente } from "../../domain/usecases/envio/get-envios-por-cliente";

export class EnvioController {
    constructor(
        private readonly envioRepo: EnvioRepository,
        private readonly direccionRepo: DireccionEnvioRepository,
        private readonly paqueteRepo: PaqueteRepository,
        private readonly paqueteItemRepo: PaqueteItemRepository,
        private readonly inventarioRepo: InventarioGenericoRepository,
        private readonly movimientoRepo: MovimientoAlmacenRepository,
        private readonly historialRepo: HistorialRepository,
    ) { }

    public create = (req: Request, res: Response) => {
        if (!req.user?.id_user) return res.status(401).json({ error: 'Usuario no autenticado' });

        const [error, dto] = CreateEnvioDto.create({
            ...req.body,
            registrado_por_id: req.body.registrado_por_id ?? req.user.id_user,
        });
        if (error) return res.status(400).json({ error });

        new CrearEnvio(this.envioRepo, this.direccionRepo, this.paqueteRepo)
            .execute(dto!)
            .then(envio => res.json(envio))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public programar = (req: Request, res: Response) => {
        const [error, dto] = ProgramarEnvioDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new ProgramarEnvio(this.envioRepo)
            .execute(req.params.id, dto!)
            .then(envio => res.json(envio))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public despachar = (req: Request, res: Response) => {
        if (!req.user?.id_user) return res.status(401).json({ error: 'Usuario no autenticado' });

        const [error, dto] = DespacharEnvioDto.create({
            ...req.body,
            despachado_por_id: req.body.despachado_por_id ?? req.user.id_user,
        });
        if (error) return res.status(400).json({ error });

        new DespacharEnvio(
            this.envioRepo, this.paqueteRepo, this.paqueteItemRepo,
            this.inventarioRepo, this.movimientoRepo, this.historialRepo,
        )
            .execute(req.params.id, dto!)
            .then(envio => res.json(envio))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public confirmarEntrega = (req: Request, res: Response) => {
        if (!req.user?.id_user) return res.status(401).json({ error: 'Usuario no autenticado' });

        const [error, dto] = ConfirmarEntregaEnvioDto.create({
            ...req.body,
            entregado_por_id: req.body.entregado_por_id ?? req.user.id_user,
        });
        if (error) return res.status(400).json({ error });

        new ConfirmarEntregaEnvio(this.envioRepo)
            .execute(req.params.id, dto!)
            .then(envio => res.json(envio))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public cancelar = (req: Request, res: Response) => {
        if (!req.user?.id_user) return res.status(401).json({ error: 'Usuario no autenticado' });

        const [error, dto] = CancelarEnvioDto.create({
            ...req.body,
            cancelado_por_id: req.body.cancelado_por_id ?? req.user.id_user,
        });
        if (error) return res.status(400).json({ error });

        new CancelarEnvio(this.envioRepo, this.paqueteRepo)
            .execute(req.params.id, dto!)
            .then(envio => res.json(envio))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public registrarDevolucion = (req: Request, res: Response) => {
        if (!req.user?.id_user) return res.status(401).json({ error: 'Usuario no autenticado' });
        const [error, dto] = RegistrarDevolucionEnvioDto.create({
            ...req.body,
            registrado_por_id: req.body.registrado_por_id ?? req.user.id_user,
        });
        if (error) return res.status(400).json({ error });
        new RegistrarDevolucionEnvio(
            this.envioRepo, this.paqueteItemRepo, this.paqueteRepo, // 👈 agregado this.paqueteRepo
            this.inventarioRepo, this.movimientoRepo, this.historialRepo,
        )
            .execute(req.params.id, dto!)
            .then(envio => res.json(envio))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public getById = (req: Request, res: Response) => {
        new GetEnvio(this.envioRepo)
            .execute(req.params.id)
            .then(envio => res.json(envio))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public getAll = (req: Request, res: Response) => {
        const estado = req.query.estado as string | undefined;
        new GetEnvios(this.envioRepo)
            .execute(estado)
            .then(envios => res.json(envios))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public getByEntidad = (req: Request, res: Response) => {
        const { entidad, id_entidad } = req.params;

        new GetEnviosPorEntidad(this.paqueteItemRepo, this.envioRepo)
            .execute(entidad, id_entidad)
            .then(envios => res.json(envios))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public getByCliente = (req: Request, res: Response) => {
        new GetEnviosPorCliente(this.envioRepo)
            .execute(req.params.id_cliente)
            .then(envios => res.json(envios))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };
}