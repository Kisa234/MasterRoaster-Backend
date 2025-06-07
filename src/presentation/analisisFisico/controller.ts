import { Request, Response } from "express";

import { CreateAnalisisFisicoDto } from "../../domain/dtos/analisis/fisico/create";
import { AnalisisFisicoRepository } from "../../domain/repository/analisisFisico.repository";
import { CreateAnalisisFisico } from "../../domain/usecases/analisis/fisico/create-analisisFisico";
import { GetAnalisisFisico } from "../../domain/usecases/analisis/fisico/get-analisisFisico";
import { UpdateAnalisisFisico } from "../../domain/usecases/analisis/fisico/update-analisisFisico";
import { UpdateAnalisisFisicoDto } from "../../domain/dtos/analisis/fisico/update";
import { DeleteAnalisisFisico } from "../../domain/usecases/analisis/fisico/delete-analisisFisico";
import { GetAllAnalisisFisico } from "../../domain/usecases/analisis/fisico/get-all-analisisFisico";
import { LoteRepository } from "../../domain/repository/lote.repository";
import { AnalisisRepository } from "../../domain/repository/analisis.repository";
import { LoteAnalisisRepository } from "../../domain/repository/lote-analisis.repository";

export class AnalisisFisicoController {

    constructor(
        private readonly analisisFisicoRepository: AnalisisFisicoRepository,
        private readonly LoteRepository: LoteRepository,
        private readonly AnalisisRepository: AnalisisRepository,
        private readonly LoteAnalisisRepository: LoteAnalisisRepository
    ){}


    public createAnalisisFisico = async (req: Request, res: Response) => {
        const id_lote= req.params.id;
        const [error, createAnalisisFisicoDto] = CreateAnalisisFisicoDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new CreateAnalisisFisico(
            this.analisisFisicoRepository,
            this.LoteRepository,
            this.AnalisisRepository,
            this.LoteAnalisisRepository
        )
            .execute(createAnalisisFisicoDto!, id_lote)
            .then( analisisFisico => res.json(analisisFisico))
            .catch( error => res.status(400).json({ error }));
    };
   
    public getAnalisisFisicoById = async (req: Request, res: Response) => {
        new GetAnalisisFisico(this.analisisFisicoRepository)
            .execute(req.params.id)
            .then( analisisFisico => res.json(analisisFisico))
            .catch( error => res.status(400).json({ error})) ;
    };

    public updateAnalisisFisico = async (req: Request, res: Response) => {
        const id_lote = req.params.id;
        const [error, createAnalisisFisicoDto] = UpdateAnalisisFisicoDto.update({...req.body});
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateAnalisisFisico(
            this.analisisFisicoRepository,
            this.LoteRepository,
            this.AnalisisRepository

        )
            .execute(id_lote,createAnalisisFisicoDto!)
            .then( analisisFisico => res.json(analisisFisico))
            .catch( error => res.status(400).json({ error }
            ));
            
    };

    public deleteAnalisisFisico = async (req: Request, res: Response) => {
        const id_analisis_fisico = req.params.id;

        new DeleteAnalisisFisico(this.analisisFisicoRepository)
            .execute(id_analisis_fisico)
            .then( analisisFisico => res.json(analisisFisico))
            .catch( error => res.status(400).json({ error }));
    };

    public getAllAnalisisFisico = async (req: Request, res: Response) => {
        new GetAllAnalisisFisico(this.analisisFisicoRepository)
            .execute()
            .then( analisisFisico => res.json(analisisFisico))
            .catch( error => res.status(400).json({ error }));
    };
}