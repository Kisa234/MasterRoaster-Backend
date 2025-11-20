import { Request, Response } from "express";
import { BoxOpcionRepository } from "../../domain/repository/boxopcion.repository";
import { CreateBoxOpcionDto } from "../../domain/dtos/boxes/box-opcion/create";
import { CreateBoxOpcion } from "../../domain/usecases/boxes/box-opcion/create-boxopcion";
import { GetBoxOpcion } from "../../domain/usecases/boxes/box-opcion/get-boxopcion";
import { GetOpcionesByTemplate } from "../../domain/usecases/boxes/box-opcion/get-opciones-by-template";
import { UpdateBoxOpcionDto } from "../../domain/dtos/boxes/box-opcion/update";
import { UpdateBoxOpcion } from "../../domain/usecases/boxes/box-opcion/update-boxopcion";
import { DeleteBoxOpcion } from "../../domain/usecases/boxes/box-opcion/delete-boxopcion";

export class BoxOpcionController {

    constructor(
        private readonly repository: BoxOpcionRepository
    ) {}

    public create = (req: Request, res: Response) => {
        const [error, dto] = CreateBoxOpcionDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateBoxOpcion(this.repository)
            .execute(dto!)
            .then(op => res.json(op))
            .catch(err => res.status(400).json({ error: err?.message ?? String(err) }));
    };

    public getById = async (req: Request, res: Response) => {
        try {
            const { id_opcion } = req.params;
            const opcion = await new GetBoxOpcion(this.repository).execute(id_opcion);
            if (!opcion) return res.status(404).json({ error: "Opción no encontrada" });
            return res.json(opcion);
        } catch (err: any) {
            return res.status(400).json({ error: err?.message ?? String(err) });
        }
    };

    public getByTemplate = async (req: Request, res: Response) => {
        try {
            const { id_box_template } = req.params;
            const opciones = await new GetOpcionesByTemplate(this.repository).execute(id_box_template);
            return res.json(opciones);
        } catch (err: any) {
            return res.status(400).json({ error: err?.message ?? String(err) });
        }
    };

    public update = async (req: Request, res: Response) => {
        try {
            const { id_opcion } = req.params;
            const updated = await new UpdateBoxOpcion(this.repository).execute(id_opcion, req.body);
            return res.json(updated);
        } catch (err: any) {
            return res.status(400).json({ error: err?.message ?? String(err) });
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            const { id_opcion } = req.params;
            const deleted = await new DeleteBoxOpcion(this.repository).execute(id_opcion);
            return res.json(deleted);
        } catch (err: any) {
            return res.status(400).json({ error: err?.message ?? String(err) });
        }
    };
}
