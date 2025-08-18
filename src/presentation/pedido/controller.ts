import { GetLoteById } from './../../domain/usecases/lote/lote/get-lote';
import { GetPedidosByLote } from './../../domain/usecases/pedido/get-pedido-lote';
import { GetPedidos } from './../../domain/usecases/pedido/get-pedidos';
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
import { CreateLoteUseCase } from "../../domain/usecases/lote/lote/create-lote";
import { AnalisisRepository } from "../../domain/repository/analisis.repository";
import { AnalisisFisicoRepository } from "../../domain/repository/analisisFisico.repository";
import { GetPedidosOrdenTueste } from "../../domain/usecases/pedido/get-pedidos-tueste";
import { GetPedidosOrdenTuesteByFecha } from "../../domain/usecases/pedido/get-pedidos-tueste-fecha";
import { LoteAnalisisRepository } from "../../domain/repository/lote-analisis.repository";
import { AnalisisSensorialRepository } from "../../domain/repository/analisisSensorial.repository";
import { AnalisisDefectosRespository } from "../../domain/repository/analisisDefectos.repository";

export class PedidoController {

    constructor(
        private readonly pedidoRepository: PedidoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly userRepository: UserRepository,
        private readonly tuesteRepository: TuesteRepository,
        private readonly createLoteUseCase: CreateLoteUseCase,
        private readonly analisisRepository: AnalisisRepository,
        private readonly analisisFisicoRepository: AnalisisFisicoRepository,
        private readonly analisisSensorialRepository: AnalisisSensorialRepository,
        private readonly analisisDefectosRepository: AnalisisDefectosRespository,
        private readonly loteAnalisisRepository: LoteAnalisisRepository
    ) {
    }

    public createPedido = async (req: Request, res: Response) => {
        const [error, createPedidoDto] = CreatePedidoDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }

        new CreatePedido(
            this.pedidoRepository,
            this.loteRepository,
            this.userRepository,
            this.createLoteUseCase,
            this.tuesteRepository,
            this.analisisRepository,
            this.analisisFisicoRepository,
            this.analisisSensorialRepository,
            this.analisisDefectosRepository,
            this.loteAnalisisRepository,

            )
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
        new UpdatePedido( 
            this.pedidoRepository,
            this.loteRepository,
            this.tuesteRepository,
            this.userRepository,
            this.analisisRepository,
            this.analisisFisicoRepository
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
            this.userRepository,
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

    public getAllPedidos = async (req: Request, res: Response) => {
        new GetAllPedidos(this.pedidoRepository)
            .execute()
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error }));   
    };

    public completarPedido = async (req: Request, res: Response) => {
        new CompletarPedido(this.pedidoRepository)
            .execute(req.params.id)
            .then(pedido => res.json(pedido))
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

    public GetPedidosByLote = async (req: Request, res: Response) =>{
        const idLote = req.params.id_lote;
        new GetPedidosByLote(this.pedidoRepository)
            .execute(idLote)
            .then(pedidos => res.json(pedidos))
            .catch(error => res.status(400).json({ error }));

    }
}
