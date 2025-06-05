import { Request, Response } from "express";

import { CreateAnalisisSensorialDTO } from "../../domain/dtos/analisis/sensorial/create";
import { AnalisisSensorialEntity } from "../../domain/entities/analisisSensorial.entity";
import { AnalisisSensorialRepository } from "../../domain/repository/analisisSensorial.repository";
import { CreateAnalisisSensorial } from "../../domain/usecases/analisis/sensorial/create-analisisSensorial";
import { GetAnalisisSensorial } from "../../domain/usecases/analisis/sensorial/get-analisisSensorial";
import { UpdateAnalisisSensorialDTO } from "../../domain/dtos/analisis/sensorial/update";
import { UpdateAnalisisSensorial } from "../../domain/usecases/analisis/sensorial/update-analisisSensorial";
import { DeleteAnalisisSensorial } from "../../domain/usecases/analisis/sensorial/delete-analisisSensorial";
import { GetAllAnalisisSensorial } from "../../domain/usecases/analisis/sensorial/get-all-analisisSensorial";

export class AnalisisSensorialController {


    constructor(
        private readonly analisisSensorialRepository: AnalisisSensorialRepository 
    ){}

    public createAnalisisSensorial = async (req: Request, res: Response) => {
        const id_lote= req.params.id_lote;
        const [error, createAnalisisSensorialDTO] = CreateAnalisisSensorialDTO.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new CreateAnalisisSensorial(this.analisisSensorialRepository)
            .execute(createAnalisisSensorialDTO!, id_lote)
            .then( analisisSensorial => res.json(analisisSensorial))
            .catch( error => res.status(400).json({ error }));
    } ;


    public getAnalisisSensorialById = async (req: Request, res: Response) => {
        new GetAnalisisSensorial(this.analisisSensorialRepository)
            .execute(req.params.id)
            .then( analisisSensorial => res.json(analisisSensorial))
            .catch( error => res.status(400).json({ error})) ;
    };

    public updateAnalisisSensorial = async (req: Request, res: Response) => {
        const id_analisis_sensorial = req.params.id;
        const [error, updateAnalisisSensorialDTO] = UpdateAnalisisSensorialDTO.update({...req.body, id: id_analisis_sensorial});
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateAnalisisSensorial(this.analisisSensorialRepository)
            .execute(id_analisis_sensorial,updateAnalisisSensorialDTO!)
            .then( analisisSensorial => res.json(analisisSensorial))
            .catch( error => res.status(400).json({ error }
            ));

    };

    public deleteAnalisisSensorial = async (req: Request, res: Response) => {
        const id_analisis_sensorial = req.params.id;
        new DeleteAnalisisSensorial(this.analisisSensorialRepository)
            .execute(id_analisis_sensorial)
            .then( analisisSensorial => res.json(analisisSensorial))
            .catch( error => res.status(400).json({ error }));
    };

    public getAllAnalisisSensorial = async (req: Request, res: Response) => {
        new GetAllAnalisisSensorial(this.analisisSensorialRepository)
            .execute()
            .then( analisisSensorial => res.json(analisisSensorial))
            .catch( error => res.status(400).json({ error }));
    };


}