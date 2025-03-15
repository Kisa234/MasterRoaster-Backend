import { Request, Response } from "express";

import { CreateAnalisisFisicoDto } from "../../domain/dtos/analisis/fisico/create";
import { AnalisisFisicoRepository } from "../../domain/repository/analisisFisico.repository";
import { CreateAnalisisFisico } from "../../domain/usecases/analisis/fisico/create-analisisFisico";
import { GetAnalisisFisico } from "../../domain/usecases/analisis/fisico/get-analisisFisico";
import { UpdateAnalisisFisico } from "../../domain/usecases/analisis/fisico/update-analisisFisico";
import { UpdateAnalisisFisicoDto } from "../../domain/dtos/analisis/fisico/update";

export class AnalisisFisicoController {

    constructor(
        private readonly analisisFisicoRepository: AnalisisFisicoRepository
    ){}


    public createAnalisisFisico = async (req: Request, res: Response) => {
        const [error, createAnalisisFisicoDto] = CreateAnalisisFisicoDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new CreateAnalisisFisico(this.analisisFisicoRepository)
            .execute(createAnalisisFisicoDto!)
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
        const id_analisis_fisico = req.params.id;
        const [error, createAnalisisFisicoDto] = UpdateAnalisisFisicoDto.update({...req.body,analisisFisico_id: id_analisis_fisico});
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateAnalisisFisico(this.analisisFisicoRepository)
            .execute(id_analisis_fisico,createAnalisisFisicoDto!)
            .then( analisisFisico => res.json(analisisFisico))
            .catch( error => res.status(400).json({ error }
            ));
            
    };
}