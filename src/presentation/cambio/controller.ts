import { Request, Response } from "express";
import { CambioRepository } from "../../domain/repository/cambio.repository";
import { CreateCambioDto } from "../../domain/dtos/cambio/create";

import { CreateCambio } from "../../domain/usecases/cambio/create-cambio";
import { GetCambiosByEntidad } from "../../domain/usecases/cambio/get-cambios-by-entidad";
import { GetCambiosByUser } from "../../domain/usecases/cambio/get-cambios-by-user";

export class CambioController {

    constructor(
        private readonly cambioRepository: CambioRepository
    ) {}

    public createCambio = async (req: Request, res: Response) => {
        const [error, dto] = CreateCambioDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateCambio(this.cambioRepository)
            .execute(dto!)
            .then(cambio => res.status(201).json(cambio))
            .catch(error => res.status(400).json({ error }));
    };

    public getCambiosByEntidad = async (req: Request, res: Response) => {
        const { entidad, id_entidad } = req.params;

        new GetCambiosByEntidad(this.cambioRepository)
            .execute(entidad, id_entidad)
            .then(cambios => res.json(cambios))
            .catch(error => res.status(400).json({ error }));
    };

    public getCambiosByUser = async (req: Request, res: Response) => {
        const { id_user } = req.params;

        new GetCambiosByUser(this.cambioRepository)
            .execute(id_user)
            .then(cambios => res.json(cambios))
            .catch(error => res.status(400).json({ error }));
    };
}
