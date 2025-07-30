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

export class TuesteController {

    constructor(
        private readonly tuesteRepository: TuesteRepository,
        private readonly createLoteTostado: CreateLoteTostado,
        private readonly pedidoRepository: PedidoRepository,
        private readonly loteRepository: LoteRepository,
    ){}

    public createTueste = async (req: Request, res: Response) => {
        const [error, createTuesteDto] = CreateTuesteDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new CreateTueste(this.tuesteRepository)
            .execute(createTuesteDto!)
            .then( tueste => res.json(tueste))
            .catch( error => res.status(400).json({ error }));
    };

    public updateTueste = async (req: Request, res: Response) => {
        const id_tueste = req.params.id;
        const [error, updateTuesteDto] = UpdateTuesteDto.update(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateTueste(this.tuesteRepository)
            .execute(id_tueste,updateTuesteDto!)
            .then( tueste => res.json(tueste))
            .catch( error => res.status(400).json({ error }
            ));
    };

    public completarTostados = async (req: Request, res: Response) => {
        const id_tueste = req.params.id;
        const [error, completeTuesteDto] = CompleteTuesteDto.update(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new CompleteTueste(
            this.tuesteRepository,
            this.pedidoRepository,
            this.loteRepository,
            this.createLoteTostado
            
            )
            .execute(id_tueste, completeTuesteDto!)
            .then( tueste => res.json(tueste))
            .catch( error => res.status(400).json({ error}));
    }

    public deleteTueste = async (req: Request, res: Response) => {
        new DeleteTueste(this.tuesteRepository)
            .execute(req.params.id)
            .then( tueste => res.json(tueste))
            .catch( error => res.status(400).json({ error })) ;
    }

    public getTuesteById = async (req: Request, res: Response) => {
        new GetTueste(this.tuesteRepository)
            .execute(req.params.id)
            .then( tueste => res.json(tueste))
            .catch( error => res.status(400).json({ error}));
    }

    public getTuesteByFecha = async (req: Request, res: Response) => {
        new GetTueste(this.tuesteRepository)
            .execute(req.params.fecha)
            .then( tueste => res.json(tueste))
            .catch( error => res.status(400).json({ error}));
    }

    public getAllTuestes = async (req: Request, res: Response) => {
        new GetAllTueste(this.tuesteRepository)
            .execute()
            .then( tuestes => res.json(tuestes))
            .catch( error => res.status(400).json({ error}));
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
    

}