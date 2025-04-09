import { Request, Response } from "express";

import { CreateAnalisisRapidoDto } from "../../domain/dtos/analisis/rapido/create";
import { AnalisisRapidoRepository } from "../../domain/repository/analisisRapido.repository";
import { CreateAnalisisRapido } from "../../domain/usecases/analisis/rapido/create-analisisRapido";
import { GetAnalisisRapido } from "../../domain/usecases/analisis/rapido/get-analisisRapido";
import { UpdateAnalisisRapidoDto } from '../../domain/dtos/analisis/rapido/update';
import { UpdateAnalisisRapido } from "../../domain/usecases/analisis/rapido/update-analisisRapido";
import { DeleteAnalisisRapido } from "../../domain/usecases/analisis/rapido/delete-analisisRapido";
import { GetAllAnalisisRapido } from "../../domain/usecases/analisis/rapido/get-all-analisisRapido";


export class AnalisisRapidoController {

    constructor(
        private readonly analisisRapidoRepository: AnalisisRapidoRepository
    ){}


    public createAnalisisRapido = async (req: Request, res: Response) => {
        const [error, createAnalisisRapidoDto] = CreateAnalisisRapidoDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new CreateAnalisisRapido(this.analisisRapidoRepository)
            .execute(createAnalisisRapidoDto!)
            .then( analisisRapido => res.json(analisisRapido))
            .catch( error => res.status(400).json({ error }));
    };

    public getAnalisisRapidoById = async (req: Request, res: Response) => {
        new GetAnalisisRapido(this.analisisRapidoRepository)
            .execute(req.params.id)
            .then( analisisRapido => res.json(analisisRapido))
            .catch( error => res.status(400).json({ error})) ;
    };

    public updateAnalisisRapido = async (req: Request, res: Response) => {
        const id_analisis_rapido = req.params.id;
        const [error, updateAnalisisRapidoDto] = UpdateAnalisisRapidoDto.update({...req.body,analisisRapido_id: id_analisis_rapido});
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateAnalisisRapido(this.analisisRapidoRepository)
            .execute(id_analisis_rapido,updateAnalisisRapidoDto!)
            .then( analisisRapido => res.json(analisisRapido))
            .catch( error => res.status(400).json({ error }
            ));
    };

    public deleteAnalisisRapido = async (req: Request, res: Response) => {
        const id_analisis_rapido = req.params.id;
        new DeleteAnalisisRapido(this.analisisRapidoRepository)
            .execute(id_analisis_rapido)
            .then( analisisRapido => res.json(analisisRapido))
            .catch( error => res.status(400).json({ error }));
    };

    public getAllAnalisisRapido = async (req: Request, res: Response) => {
        new GetAllAnalisisRapido(this.analisisRapidoRepository)
            .execute()
            .then( analisisRapido => res.json(analisisRapido))
            .catch( error => res.status(400).json({ error }));
    };

}