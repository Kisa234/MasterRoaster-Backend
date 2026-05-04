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
        private readonly inventarioRepository: InventarioProductoRepository,
        private readonly loteTostadoRepository: LoteTostadoRepository,
        private readonly inventarioLoteTostadoRepository: InventarioLoteTostadoRepository,
        private readonly historialRepository: HistorialRepository,
        private readonly movimientoAlmacenRepository: MovimientoAlmacenRepository,
        private readonly createLoteTostado: CreateLoteTostado


    ) {
    }

    public createPedido = async (req: Request, res: Response) => {
        if (!req.user?.id_user) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }
        // Inyectamos el usuario autenticado directamente aquí
        const body = { ...req.body, creado_por_id: req.user?.id_user as string };
        const id_completado_por = req.user?.id_user as string;
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
            this.analisisFisicoRepository
        )
            .execute(createPedidoDto!, id_completado_por)
            .then(pedido => res.json(pedido))
            .catch(error => res.status(400).json({ error }));
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
            this.inventarioRepository,
            this.historialRepository,
            this.movimientoAlmacenRepository,
            this.tuesteRepository,
            this.createLoteTostado

        )
            .execute(id_pedido, id_completado_por)
            .then(pedido => res.json(pedido))
            .catch(error => res.status(400).json({ error }));
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
            this.inventarioLoteRepository
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
        console.log(`Recibiendo solicitud para obtener pedidos con lote por estado "${estado}" y tipo "${tipo}"`);

        new GetPedidosConLoteByEstadoYTipo(this.pedidoRepository)
            .execute(estado, tipo)
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error: error.message ?? error }));
    }

    
}
