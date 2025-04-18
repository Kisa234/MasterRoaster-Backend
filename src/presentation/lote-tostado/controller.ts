import { Request, Response } from "express";

import { CreateLoteTostadoDto } from "../../domain/dtos/lotes/lote-tostado/create";
import { LoteTostadoRepository } from "../../domain/repository/loteTostado.repository";
import { CreateLoteTostado } from "../../domain/usecases/lote/lote-tostado/create-lote-tostado";
import { GetLoteTostado } from "../../domain/usecases/lote/lote-tostado/get-lote-tostado";
import { UpdateLoteTostadoDto } from "../../domain/dtos/lotes/lote-tostado/update";
import { UpdateLoteTostado } from "../../domain/usecases/lote/lote-tostado/update-lote-tostado";
import { DeleteLoteTostado } from "../../domain/usecases/lote/lote-tostado/delete-lote-tostado";
import { GetLotesTostadoByLote } from "../../domain/usecases/lote/lote-tostado/get-lote-tostado-lote";
import { GetAllLoteTostado } from "../../domain/usecases/lote/lote-tostado/get-all-lote-tostado";

export class LoteTostadoController {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ){}

    public createLoteTostado = (req:Request , res : Response) => {
        const [error, createLoteTostadoDto] = CreateLoteTostadoDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }

        new CreateLoteTostado(this.loteTostadoRepository)
            .execute(createLoteTostadoDto!)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public getLoteTostadoById = (req:Request , res : Response) => {
        new GetLoteTostado(this.loteTostadoRepository)
            .execute(req.params.id)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public updateLoteTostado = (req:Request , res : Response) => {
        const id_lote_tostado = req.params.id;
        const [error, updateLoteTostadoDto] = UpdateLoteTostadoDto.update({...req.body, 'id_lote_tostado ': id_lote_tostado});
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateLoteTostado(this.loteTostadoRepository)
            .execute(req.params.id, updateLoteTostadoDto!)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public deleteLoteTostado = (req:Request , res : Response) => {
        const id_lote_tostado = req.params.id;
        new DeleteLoteTostado(this.loteTostadoRepository)
            .execute(id_lote_tostado)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public getLotesTostados = (req:Request , res : Response) => {
        new GetAllLoteTostado(this.loteTostadoRepository)
            .execute()
            .then( lotes => res.json(lotes))
            .catch( error => res.status(400).json({ error }));

    }

    public getLotesTostadoByLoteId = (req:Request , res : Response) => {
        const id_lote = req.params.id;
        new GetLotesTostadoByLote(this.loteTostadoRepository)
            .execute(id_lote)
            .then( lotes => res.json(lotes))
            .catch( error => res.status(400).json({ error }));
    }

}