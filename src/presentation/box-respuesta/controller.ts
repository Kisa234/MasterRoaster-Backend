import { Request, Response } from "express";
import { BoxRespuestaRepository } from "../../domain/repository/boxrespuesta.repository";
import { CreateBoxRespuestaDto } from "../../domain/dtos/boxes/box-respuesta/create";
import { CreateBoxRespuesta } from "../../domain/usecases/boxes/box-respuesta/create-boxrespuesta";
import { GetBoxRespuesta } from "../../domain/usecases/boxes/box-respuesta/get-boxrespuesta";
import { GetRespuestasByTemplate } from "../../domain/usecases/boxes/box-respuesta/get-respuestas-by-template";
import { GetRespuestasByUser } from "../../domain/usecases/boxes/box-respuesta/get-respuestas-by-user";
import { UpdateBoxRespuestaDto } from "../../domain/dtos/boxes/box-respuesta/update";
import { UpdateBoxRespuesta } from "../../domain/usecases/boxes/box-respuesta/update-boxrespuesta";
import { DeleteBoxRespuesta } from "../../domain/usecases/boxes/box-respuesta/delete-boxrespuesta";

export class BoxRespuestaController {

    constructor(
        private readonly repository: BoxRespuestaRepository
    ) {}

    public create = (req: Request, res: Response) => {
        const [error, dto] = CreateBoxRespuestaDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateBoxRespuesta(this.repository)
            .execute(dto!)
            .then(resp => res.json(resp))
            .catch(err => res.status(400).json({ error: err?.message ?? String(err) }));
    };

    public getById = async (req: Request, res: Response) => {
        try {
            const { id_respuesta } = req.params;
            const resp = await new GetBoxRespuesta(this.repository).execute(id_respuesta);
            if (!resp) return res.status(404).json({ error: "Respuesta no encontrada" });
            return res.json(resp);
        } catch (err: any) {
            return res.status(400).json({ error: err?.message ?? String(err) });
        }
    };

    public getByTemplate = async (req: Request, res: Response) => {
        try {
            const { id_box_template } = req.params;
            const respuestas = await new GetRespuestasByTemplate(this.repository).execute(id_box_template);
            return res.json(respuestas);
        } catch (err: any) {
            return res.status(400).json({ error: err?.message ?? String(err) });
        }
    };

    public getByUser = async (req: Request, res: Response) => {
        try {
            const { id_user } = req.params;
            const respuestas = await new GetRespuestasByUser(this.repository).execute(id_user);
            return res.json(respuestas);
        } catch (err: any) {
            return res.status(400).json({ error: err?.message ?? String(err) });
        }
    };

    public update = async (req: Request, res: Response) => {
        try {
            const { id_respuesta } = req.params;
            const updated = await new UpdateBoxRespuesta(this.repository).execute(id_respuesta, req.body);
            return res.json(updated);
        } catch (err: any) {
            return res.status(400).json({ error: err?.message ?? String(err) });
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            const { id_respuesta } = req.params;
            const deleted = await new DeleteBoxRespuesta(this.repository).execute(id_respuesta);
            return res.json(deleted);
        } catch (err: any) {
            return res.status(400).json({ error: err?.message ?? String(err) });
        }
    };
}
