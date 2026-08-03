import { Request, Response } from "express";
import { TransportistaRepository } from "../../domain/repository/transportista.repository";
import { CreateTransportistaDto } from "../../domain/dtos/transportista/create";
import { UpdateTransportistaDto } from "../../domain/dtos/transportista/update";
import { CreateTransportista } from "../../domain/usecases/transportista/create-transportista";
import { UpdateTransportista } from "../../domain/usecases/transportista/update-transportista";
import { DeleteTransportista } from "../../domain/usecases/transportista/delete-transportista";
import { GetTransportista } from "../../domain/usecases/transportista/get-transportista";
import { GetTransportistas } from "../../domain/usecases/transportista/get-transportistas";

export class TransportistaController {
    constructor(private readonly repository: TransportistaRepository) { }

    public create = (req: Request, res: Response) => {
        const [error, dto] = CreateTransportistaDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateTransportista(this.repository)
            .execute(dto!)
            .then(transportista => res.json(transportista))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public update = (req: Request, res: Response) => {
        const [error, dto] = UpdateTransportistaDto.update(req.body);
        if (error) return res.status(400).json({ error });

        new UpdateTransportista(this.repository)
            .execute(req.params.id, dto!)
            .then(transportista => res.json(transportista))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public delete = (req: Request, res: Response) => {
        new DeleteTransportista(this.repository)
            .execute(req.params.id)
            .then(transportista => res.json(transportista))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public getById = (req: Request, res: Response) => {
        new GetTransportista(this.repository)
            .execute(req.params.id)
            .then(transportista => res.json(transportista))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public getAll = (req: Request, res: Response) => {
        const soloActivos = req.query.incluirInactivos === 'true' ? false : true;
        new GetTransportistas(this.repository)
            .execute(soloActivos)
            .then(transportistas => res.json(transportistas))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };
}
