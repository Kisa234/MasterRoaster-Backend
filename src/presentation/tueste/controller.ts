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
import { LoteTostadoRepository } from '../../domain/repository/loteTostado.repository';
import { PedidoRepository } from "../../domain/repository/pedido.repository";
import { CompleteTuesteDto } from '../../domain/dtos/tueste/complete';
import { LoteRepository } from "../../domain/repository/lote.repository";
import { GetAllLoteTostado } from "../../domain/usecases/lote/lote-tostado/get-all-lote-tostado";
import { GetAllLotesVerdes } from "../../domain/usecases/lote/lote/get-lotes-verdes";
import { GetALLLotesTostados } from "../../domain/usecases/lote/lote/get-lotes-tostados";

export class TuesteController {

    constructor(
        private readonly tuesteRepository: TuesteRepository,
        private readonly loteTostadoRepository: LoteTostadoRepository,
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
            this.loteTostadoRepository,
            this.pedidoRepository,
            this.loteRepository
            
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
   

    

}