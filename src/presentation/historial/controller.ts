import { HistorialRepository } from "../../domain/repository/historial.repository";
import { Request, Response } from "express";
import { CreateHistorial } from "../../domain/usecases/historial/create-historial";
import { CreateHistorialDto } from "../../domain/dtos/historial/create";
import { GetHistorialById } from "../../domain/usecases/historial/get-historial";
import { GetHistorialByUser } from "../../domain/usecases/historial/get-historial-user";
import { GetHistorialByEntidad } from "../../domain/usecases/historial/get-historial-entidad";
import { GetAllHistorial } from "../../domain/usecases/historial/get-all-historial";

export class HistorialController {
    constructor(
        private readonly historialRepository: HistorialRepository
    ) { }

    public createHistorial = async (req: Request, res: Response) => {
        const [error, dto] = CreateHistorialDto.create(req.body);
        if (error) return res.status(400).json({ error });

        if (!req.user) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        const id_user = req.user.id;

        const [error2, dtoWithUser] = CreateHistorialDto.create({
            ...req.body,
            id_user
        });

        new CreateHistorial(this.historialRepository)
            .execute(dtoWithUser!)
            .then(historial => res.status(201).json(historial))
            .catch(err => res.status(400).json({ error: err.message }));
    };


    public getHistorialById = (req: Request, res: Response) => {
        new GetHistorialById(this.historialRepository)
            .execute(req.params.id)
            .then(historial => res.json(historial))
            .catch(error => res.status(400).json({ error }));

    }

    public getHistorialByUserId = (req: Request, res: Response) => {
        new GetHistorialByUser(this.historialRepository)
            .execute(req.params.id)
            .then(historial => res.json(historial))
            .catch(error => res.status(400).json({ error }));
    }

    public getHistorialByEntidadId = (req: Request, res: Response) => {
        new GetHistorialByEntidad(this.historialRepository)
            .execute(req.params.id)
            .then(historial => res.json(historial))
            .catch(error => res.status(400).json({ error }));

    }

    public getAllHistorial = (req: Request, res: Response) => {
        new GetAllHistorial(this.historialRepository)
            .execute()
            .then(historial => res.json(historial))
            .catch(error => res.status(400).json({ error }));
    }


}