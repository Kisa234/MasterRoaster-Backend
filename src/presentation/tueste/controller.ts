import { Request, Response } from "express";

import { CreateTuesteDto } from "../../domain/dtos/tueste/create";
import { TuesteRepository } from "../../domain/repository/tueste.repository";
import { CreateTueste } from "../../domain/usecases/tueste/create-tueste";
import { UpdateTuesteDto } from '../../domain/dtos/tueste/update';
import { UpdateTueste } from "../../domain/usecases/tueste/update-tueste";
import { DeleteTueste } from "../../domain/usecases/tueste/delete-tueste";
import { GetTueste } from "../../domain/usecases/tueste/get-tueste";

export class TuesteController {

    constructor(
        private readonly tuesteRepository: TuesteRepository
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
        const id_pedido = req.params.id;
        const [error, updateTuesteDto] = UpdateTuesteDto.update({...req.body, id: id_pedido});
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateTueste(this.tuesteRepository)
            .execute(id_pedido,updateTuesteDto!)
            .then( tueste => res.json(tueste))
            .catch( error => res.status(400).json({ error }
            ));
    };

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

}