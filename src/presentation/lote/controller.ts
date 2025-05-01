import { Request, Response } from "express";
import { CreateLoteDto } from "../../domain/dtos/lotes/lote/create";
import { LoteRepository } from "../../domain/repository/lote.repository";
import { CreateLote } from "../../domain/usecases/lote/lote/create-lote";
import { GetLoteById } from "../../domain/usecases/lote/lote/get-lote";
import { UpdateLote } from '../../domain/usecases/lote/lote/update-lote';
import { UpdateLoteDto } from "../../domain/dtos/lotes/lote/update";
import { DeleteLote } from "../../domain/usecases/lote/lote/delete.lote";
import { GetLotes } from "../../domain/usecases/lote/lote/get-lotes";
import { CreateLoteFromMuestra } from "../../domain/usecases/lote/lote/create-lote-muestra";
import { UserRepository } from "../../domain/repository/user.repository";
import { MuestraRepository } from "../../domain/repository/muestra.repository";

export class LoteController {

    constructor (
        private readonly loteRepository: LoteRepository,
        private readonly muestraRepository: MuestraRepository,
        private readonly userRepository: UserRepository,
    ){}

    public createLote = (req:Request , res : Response) => {
        const [error, createLoteDto] = CreateLoteDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }

        new CreateLote(
            this.loteRepository,
            this.userRepository,
        )
            .execute(createLoteDto!)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public getLoteById = (req:Request , res : Response) => {
        new GetLoteById(this.loteRepository)
            .execute(req.params.id)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public updateLote = (req:Request , res : Response) => {
        const id_lote = req.params.id;
        const [error, updateLoteDto] = UpdateLoteDto.update({...req.body, 'id_lote ': id_lote});
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

    public getLotes = (req:Request , res : Response) => {
        new GetLotes(this.loteRepository)
            .execute()
            .then( lotes => res.json(lotes))
            .catch( error => res.status(400).json({ error }));
    }

    public createLoteFromMuestra = (req:Request , res : Response) => {
        const id_muestra = req.params.id;
        const peso = req.body.peso;
        if (!peso) {
            return res.status(400).json({ error: 'Peso is required' });
        }
        new CreateLoteFromMuestra(
            this.loteRepository,
            this.muestraRepository,
            this.userRepository,
        )
            .execute(id_muestra, peso)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public getLotesByUserId = (req:Request , res : Response) => {
        new GetLotes(this.loteRepository)
            .execute()
            .then( lotes => res.json(lotes))
            .catch( error => res.status(400).json({ error }));
    }

}