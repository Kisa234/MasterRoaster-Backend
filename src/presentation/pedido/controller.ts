import { GetPedidosByLote } from './../../domain/usecases/pedido/get-pedido-lote';
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
import { GetAllPedidos } from '../../domain/usecases/pedido/get-pedidos';
import { TuesteRepository } from "../../domain/repository/tueste.repository";
import { UserRepository } from "../../domain/repository/user.repository";
import { LoteRepository } from "../../domain/repository/lote.repository";
import { AnalisisRepository } from "../../domain/repository/analisis.repository";
import { AnalisisFisicoRepository } from "../../domain/repository/analisisFisico.repository";
import { GetPedidosOrdenTueste } from "../../domain/usecases/pedido/get-pedidos-tueste";
import { GetPedidosOrdenTuesteByFecha } from "../../domain/usecases/pedido/get-pedidos-tueste-fecha";
import { DuplicateLoteUseCase } from '../../domain/usecases/lote/lote/duplicar-lote';
import { InventarioProductoRepository } from '../../domain/repository/inventario-producto.repository';
import { LoteTostadoRepository } from '../../domain/repository/loteTostado.repository';
import { SetPedidoFacturado } from '../../domain/usecases/pedido/set-facturado';
import { InventarioLoteRepository } from '../../domain/repository/inventario-lote.repository';
import { InventarioLoteTostadoRepository } from '../../domain/repository/inventario-lote-tostado.repository';
import { HistorialRepository } from '../../domain/repository/historial.repository';
import { MovimientoAlmacenRepository } from '../../domain/repository/movimiento-almacen.repository';
import { CreateLoteTostado } from '../../domain/usecases/lote/lote-tostado/create-lote-tostado';
import { GetPedidosConLoteByEstadoYTipo } from '../../domain/usecases/pedido/get-pedidos-con-lote-by-estado-y-tipo';
import { GetPedidosConLote } from '../../domain/usecases/pedido/get-pedidos-con-lote';
import { GetPedidoConLote } from '../../domain/usecases/pedido/get-pedido-con-lote';
import { GetPedidosByRango } from '../../domain/usecases/pedido/get-pedidos-rango';
import { GetEstadisticasTueste } from '../../domain/usecases/pedido/get-estadisticas-tueste';
import { PedidoBolsaRepository } from '../../domain/repository/pedido-bolsa.repository';
import { BolsaRepository } from '../../domain/repository/bolsa.repository';
import { InventarioBolsaRepository } from '../../domain/repository/inventario-bolsa.repository';
import { PedidoItemRepository } from '../../domain/repository/pedido-item.repository';
import { InventarioGenericoRepository } from '../../domain/repository/inventario-generico.repository';
import { PaqueteRepository } from '../../domain/repository/paquete.repository';
import { PaqueteItemRepository } from '../../domain/repository/paquete-item.repository';
import { GetEstadisticasPedidos } from '../../domain/usecases/pedido/get-estadisticas-pedidos';
import { GetPedidosOwnedByStore } from '../../domain/usecases/pedido/get-pedidos-owned-by-store';
import { GetPedidosByUserId } from '../../domain/usecases/pedido/get-pedidos-user';

export class PedidoController {

    constructor(
        private readonly pedidoRepository: PedidoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly inventarioLoteRepository: InventarioLoteRepository,
        private readonly userRepository: UserRepository,
        private readonly tuesteRepository: TuesteRepository,
        private readonly analisisRepository: AnalisisRepository,
        private readonly analisisFisicoRepository: AnalisisFisicoRepository,
        private readonly duplicateLoteUseCase: DuplicateLoteUseCase,
        private readonly loteTostadoRepository: LoteTostadoRepository,
        private readonly inventarioLoteTostadoRepository: InventarioLoteTostadoRepository,
        private readonly historialRepository: HistorialRepository,
        private readonly movimientoAlmacenRepository: MovimientoAlmacenRepository,
        private readonly createLoteTostado: CreateLoteTostado,
        private readonly pedidoBolsaRepository: PedidoBolsaRepository,
        private readonly bolsaRepository: BolsaRepository,
        private readonly inventarioBolsaRepository: InventarioBolsaRepository,
        private readonly pedidoItemRepository: PedidoItemRepository,
        private readonly inventarioGenericoRepository: InventarioGenericoRepository,
        private readonly paqueteRepository: PaqueteRepository,
        private readonly paqueteItemRepository: PaqueteItemRepository,


    ) {
    }

    public createPedido = async (req: Request, res: Response) => {
        if (!req.user?.id_user) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const idUserFromBody = req.body.id_user as string | undefined;
        const ownedByStoreFromBody = req.body.owned_by_store === true;

        let effectiveUserId: string | undefined;

        if (ownedByStoreFromBody) {
            effectiveUserId = undefined;
        } else if (idUserFromBody) {
            effectiveUserId = idUserFromBody;
        } else {
            return res.status(400).json({
                error: 'Debes indicar si el pedido es de tienda (owned_by_store) o seleccionar un cliente (id_user)'
            });
        }

        const body = {
            ...req.body,
            id_user: effectiveUserId,
            owned_by_store: ownedByStoreFromBody,
            creado_por_id: req.user.id_user as string,
        };
        const id_completado_por = req.user.id_user as string;

        const [error, createPedidoDto] = CreatePedidoDto.create(body);
        if (error) {
            return res.status(400).json({ error });
        }

        new CreatePedido(
            this.pedidoRepository,
            this.loteRepository,
            this.inventarioLoteRepository,
            this.loteTostadoRepository,
            this.inventarioLoteTostadoRepository,
            this.userRepository,
            this.tuesteRepository,
            this.analisisRepository,
            this.analisisFisicoRepository,
            this.pedidoBolsaRepository,
            this.pedidoItemRepository,
            this.inventarioGenericoRepository,
        )
            .execute(createPedidoDto!, id_completado_por, body.bolsas, body.items)
            .then(pedido => res.json(pedido))
            .catch(error => {
                console.error('[createPedido] error en use case:', error);
                return res.status(400).json({ error: error?.message ?? String(error) });
            });
    };

    public completarPedido = async (req: Request, res: Response) => {
        if (!req.user?.id_user) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }
        const body = { ...req.body, creado_por_id: req.user?.id_user as string };
        const id_completado_por = req.user?.id_user as string;
        const id_pedido = req.params.id;
        new CompletarPedido(
            this.pedidoRepository,
            this.loteRepository,
            this.loteTostadoRepository,
            this.inventarioLoteRepository,
            this.inventarioLoteTostadoRepository,
            this.duplicateLoteUseCase,
            this.historialRepository,
            this.movimientoAlmacenRepository,
            this.tuesteRepository,
            this.createLoteTostado,
            this.pedidoBolsaRepository,
            this.bolsaRepository,
            this.inventarioBolsaRepository,
            this.pedidoItemRepository,
            this.paqueteRepository,
            this.paqueteItemRepository,
            this.inventarioGenericoRepository,

        )
            .execute(id_pedido, id_completado_por)
            .then(pedido => res.json(pedido))
            .catch(error => {
                console.log('Error en completarPedido:', error);
                res.status(400).json({ error: error.message ?? String(error) });
            });
    };

    public updatePedido = async (req: Request, res: Response) => {
        const id_pedido = req.params.id;
        const [error, updatePedidoDto] = UpdatePedidoDto.update({ ...req.body, id: id_pedido });
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdatePedido(
            this.pedidoRepository,
            this.loteRepository,
            this.loteTostadoRepository,
            this.tuesteRepository,
            this.userRepository,
            this.analisisRepository,
            this.analisisFisicoRepository,
            this.inventarioLoteRepository,
            this.inventarioLoteTostadoRepository,
            this.pedidoBolsaRepository,
            this.pedidoItemRepository,
            this.inventarioGenericoRepository,
        )
            .execute(id_pedido, updatePedidoDto!)
            .then(pedido => res.json(pedido))
            .catch(error => res.status(400).json({ error }));
    };

    public deletePedido = async (req: Request, res: Response) => {
        new DeletePedido(
            this.pedidoRepository,
            this.loteRepository,
            this.tuesteRepository,
            this.pedidoItemRepository
        )
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
        new GetPedidosByEstado(
            this.pedidoRepository,
            this.loteRepository,
            this.userRepository
        )
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

    public getAllPedidos = async (req: Request, res: Response) => {
        new GetAllPedidos(this.pedidoRepository)
            .execute()
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error }));
    };


    public getPedidosOrdenTueste = async (req: Request, res: Response) => {
        new GetPedidosOrdenTueste(this.pedidoRepository)
            .execute()
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error }));
    };
    public getPedidosOrdenTuesteByFecha = async (req: Request, res: Response) => {
        const fecha = new Date(req.params.fecha);
        new GetPedidosOrdenTuesteByFecha(this.pedidoRepository)
            .execute(fecha)
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error }));
    };

    public GetPedidosByLote = async (req: Request, res: Response) => {
        const idLote = req.params.id_lote;
        new GetPedidosByLote(this.pedidoRepository)
            .execute(idLote)
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error }));

    }

    public SetPedidoFacturado = async (req: Request, res: Response) => {
        try {
            const { id_pedido } = req.params;

            const pedido = await new SetPedidoFacturado(
                this.pedidoRepository,
                this.userRepository
            ).execute(true, id_pedido);

            res.json(pedido);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public getPedidosConLote = (req: Request, res: Response) => {
        new GetPedidosConLote(this.pedidoRepository)
            .execute()
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }

    public getPedidoConLote = (req: Request, res: Response) => {
        const { id } = req.params;

        new GetPedidoConLote(this.pedidoRepository)
            .execute(id)
            .then(pedido => res.json(pedido))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }

    public getPedidosConLoteByEstadoYTipo = (req: Request, res: Response) => {
        const { estado, tipo } = req.params;

        new GetPedidosConLoteByEstadoYTipo(this.pedidoRepository)
            .execute(estado, tipo)
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }

    public getPedidosByRango = async (req: Request, res: Response) => {
        const { desde, hasta } = req.query;
        if (!desde || !hasta) {
            return res.status(400).json({ error: 'Se requieren los parámetros desde y hasta' });
        }
        new GetPedidosByRango(this.pedidoRepository)
            .execute(new Date(desde as string), new Date(hasta as string))
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error }));
    }

    public getEstadisticasTueste = async (req: Request, res: Response) => {
        const { desde, hasta } = req.query;
        if (!desde || !hasta) {
            return res.status(400).json({ error: 'Se requieren los parámetros desde y hasta' });
        }
        new GetEstadisticasTueste(
            this.tuesteRepository,
            this.pedidoRepository
        )
            .execute(new Date(desde as string), new Date(hasta as string))
            .then(estadisticas => res.json(estadisticas))
            .catch(error => res.status(400).json({ error }));
    }

    public getEstadisticasPedidos = async (req: Request, res: Response) => {
        const { desde, hasta } = req.query;
        if (!desde || !hasta) {
            return res.status(400).json({ error: 'Se requieren los parámetros desde y hasta' });
        }
        new GetEstadisticasPedidos(
            this.pedidoRepository,
            this.userRepository
        )
            .execute(new Date(desde as string), new Date(hasta as string))
            .then(estadisticas => res.json(estadisticas))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    }

    public getPedidosOwnedByStore = (req: Request, res: Response) => {
        const incluirEliminados = req.query.incluirEliminados === 'true';
        new GetPedidosOwnedByStore(this.pedidoRepository)
            .execute(incluirEliminados)
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    }

    public getPedidosByUserId = (req: Request, res: Response) => {
        const incluirEliminados = req.query.incluirEliminados === 'true';
        new GetPedidosByUserId(this.pedidoRepository)
            .execute(req.params.id, incluirEliminados)
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    }
}
