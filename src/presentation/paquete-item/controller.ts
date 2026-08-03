import { Request, Response } from "express";
import { PaqueteItemRepository } from "../../domain/repository/paquete-item.repository";

export class PaqueteItemController {
    constructor(private readonly repository: PaqueteItemRepository) { }

    public getById = (req: Request, res: Response) => {
        this.repository.getById(req.params.id)
            .then(item => {
                if (!item) return res.status(404).json({ error: 'Artículo no encontrado' });
                res.json(item);
            })
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public getByPaquete = (req: Request, res: Response) => {
        this.repository.getByPaquete(req.params.id_paquete)
            .then(items => res.json(items))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };
}
