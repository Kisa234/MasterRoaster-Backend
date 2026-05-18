import { CompletarPedidoUseCase } from './../../domain/usecases/pedido/complete-pedido';
import { Request, Response } from "express";
import { CreateTuesteDto } from "../../domain/dtos/tueste/create";
import { TuesteRepository } from "../../domain/repository/tueste.repository";
import { CreateTueste } from "../../domain/usecases/tueste/create-tueste";
import { UpdateTuesteDto } from '../../domain/dtos/tueste/update';
import { UpdateTueste } from "../../domain/usecases/tueste/update-tueste";
import { DeleteTueste } from "../../domain/usecases/tueste/delete-tueste";
import { GetTueste } from "../../domain/usecases/tueste/get-tueste";
import { GetAllTueste } from "../../domain/usecases/tueste/get-all-tueste";
import { CompleteTueste } from "../../domain/usecases/tueste/complete-tueste";
import { PedidoRepository } from "../../domain/repository/pedido.repository";
import { CompleteTuesteDto } from '../../domain/dtos/tueste/complete';
import { LoteRepository } from "../../domain/repository/lote.repository";
import { CreateLoteTostado } from "../../domain/usecases/lote/lote-tostado/create-lote-tostado";
import { GetTostadosByPedido } from "../../domain/usecases/tueste/get-by-pedido";
import { GetReferenceTueste } from "../../domain/usecases/tueste/reference-tueste";
import { HistorialRepository } from '../../domain/repository/historial.repository';
import { GetTuestesByRango } from '../../domain/usecases/tueste/get-by-rango';

export class TuesteController {

    constructor(
        private readonly tuesteRepository: TuesteRepository,
        private readonly historialRepository: HistorialRepository,
        private readonly pedidoRepository: PedidoRepository,
        private readonly completarPedidoUseCase: CompletarPedidoUseCase
    ) { }

    public createTueste = async (req: Request, res: Response) => {
        const [error, createTuesteDto] = CreateTuesteDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new CreateTueste(this.tuesteRepository)
            .execute(createTuesteDto!)
            .then(tueste => res.json(tueste))
            .catch(error => res.status(400).json({ error }));
    };

    public updateTueste = async (req: Request, res: Response) => {
        if (!req.user?.id_user) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const id_tueste = req.params.id;
        const id_user = req.user.id_user;
        const [error, updateTuesteDto] = UpdateTuesteDto.update(req.body);
        if (error) {
            return res.status(400).json({ error });
        }

        new UpdateTueste(this.tuesteRepository, this.historialRepository)
            .execute(id_tueste, updateTuesteDto!, id_user)
            .then(tueste => res.json(tueste))
            .catch(error => res.status(400).json({ error }));
    };

    public completarTostados = async (req: Request, res: Response) => {
        // verificamos que el usuario este autenticado
        if (!req.user?.id_user) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }
        const id_completado_por = req.user?.id_user as string;

        const id_tueste = req.params.id;
        const [error, completeTuesteDto] = CompleteTuesteDto.update(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new CompleteTueste(
            this.tuesteRepository,
            this.completarPedidoUseCase
        )
            .execute(id_tueste, completeTuesteDto!, id_completado_por)
            .then(tueste => res.json(tueste))
            .catch(error => res.status(400).json({ error }));
    }

    public deleteTueste = async (req: Request, res: Response) => {
        new DeleteTueste(this.tuesteRepository)
            .execute(req.params.id)
            .then(tueste => res.json(tueste))
            .catch(error => res.status(400).json({ error }));
    }

    public getTuesteById = async (req: Request, res: Response) => {
        new GetTueste(this.tuesteRepository)
            .execute(req.params.id)
            .then(tueste => res.json(tueste))
            .catch(error => res.status(400).json({ error }));
    }

    public getTuesteByFecha = async (req: Request, res: Response) => {
        new GetTueste(this.tuesteRepository)
            .execute(req.params.fecha)
            .then(tueste => res.json(tueste))
            .catch(error => res.status(400).json({ error }));
    }

    public getAllTuestes = async (req: Request, res: Response) => {
        new GetAllTueste(this.tuesteRepository)
            .execute()
            .then(tuestes => res.json(tuestes))
            .catch(error => res.status(400).json({ error }));
    }

    public getTostadosByPedido = async (req: Request, res: Response) => {
        const id_pedido = req.params.id;
        new GetTostadosByPedido(this.tuesteRepository)
            .execute(id_pedido)
            .then(tuestes => res.json(tuestes))
            .catch(error => res.status(400).json({ error }));
    }

    public getReferenceTueste = async (req: Request, res: Response) => {
        const id_lote = req.params.id;
        new GetReferenceTueste(
            this.tuesteRepository,
            this.pedidoRepository,
        ).execute(id_lote)
            .then(avgTueste => res.json(avgTueste))
            .catch(error => res.status(400).json({ error }));

    }

    public getTuestesByLoteTostado = async (req: Request, res: Response) => {
        const id_lote_tostado = req.params.id;
        this.tuesteRepository.getTostadosByLoteTostado(id_lote_tostado)
            .then(tuestes => res.json(tuestes))
            .catch(error => res.status(400).json({ error }));
    }

    public getTuestesByRango = async (req: Request, res: Response) => {
        const { desde, hasta } = req.query;
        if (!desde || !hasta) {
            return res.status(400).json({ error: 'Se requieren los parámetros desde y hasta' });
        }
        new GetTuestesByRango(this.tuesteRepository)
            .execute(new Date(desde as string), new Date(hasta as string))
            .then(tuestes => res.json(tuestes))
            .catch(error => res.status(400).json({ error }));
    }

}