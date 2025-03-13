import { Request, Response } from "express";
import { CreateLoteDto } from "../../domain/dtos/lote/create";
import { LoteRepository } from "../../domain/repository/lote.repository";
import { CreateLote } from "../../domain/usecases/lote/create-lote";
import { GetLote } from "../../domain/usecases/lote/get-lote";
import { UpdateLote } from '../../domain/usecases/lote/update-lote';
import { UpdateLoteDto } from "../../domain/dtos/lote/update";
import { DeleteLote } from "../../domain/usecases/lote/delete.lote";
import { GetLoteByEstado } from "../../domain/usecases/lote/get-lote-estado";


export class LoteController {

    constructor (
        private readonly loteRepository: LoteRepository
    ){}

    public createLote = (req:Request , res : Response) => {
        const [error, createLoteDto] = CreateLoteDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }

        new CreateLote(this.loteRepository)
            .execute(createLoteDto!)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public getLoteById = (req:Request , res : Response) => {
        new GetLote(this.loteRepository)
            .execute(req.params.id)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public updateLote = (req:Request , res : Response) => {
        const [error, updateLoteDto] = UpdateLoteDto.update(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateLote(this.loteRepository)
            .execute(req.params.id, updateLoteDto!)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public deleteLote = (req:Request , res : Response) => {
        new DeleteLote(this.loteRepository)
            .execute(req.params.id)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public getLotesByEstado = (req:Request , res : Response) => {
        const estado = req.params.estado;
        new GetLoteByEstado(this.loteRepository)
            .execute(estado)
            .then( lotes => res.json(lotes))
            .catch( error => res.status(400).json({ error }));
    }

}