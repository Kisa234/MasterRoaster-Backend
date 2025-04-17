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