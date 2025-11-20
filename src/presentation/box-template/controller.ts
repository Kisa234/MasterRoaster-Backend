import { Request, Response } from "express";
import { CreateBoxTemplateDto } from "../../domain/dtos/boxes/box-template/create";
import { CreateBoxTemplate } from "../../domain/usecases/boxes/box-template/create-boxtemplate";
import { GetBoxTemplate } from "../../domain/usecases/boxes/box-template/get-boxtemplate";
import { UpdateBoxTemplateDto } from "../../domain/dtos/boxes/box-template/update";
import { UpdateBoxTemplate } from "../../domain/usecases/boxes/box-template/update-boxtemplate";
import { DeleteBoxTemplate } from "../../domain/usecases/boxes/box-template/delete-boxtemplate";
import { GetBoxTemplates } from "../../domain/usecases/boxes/box-template/get-boxtemplates";
import { BoxOpcionRepository } from "../../domain/repository/boxopcion.repository";
import { BoxTemplateRepository } from "../../domain/repository/boxtemplate.repository";
import { CreateFullBoxTemplateDto } from "../../domain/dtos/boxes/box-template/create-full";
import { UpdateFullBoxTemplateDto } from "../../domain/dtos/boxes/box-template/update-full";
import { SetActiveBoxTemplates } from "../../domain/usecases/boxes/box-template/set-active-template";

export class BoxTemplateController {

    constructor(
        private readonly boxTemplateRepository: BoxTemplateRepository,
        private readonly boxOpcionRepository: BoxOpcionRepository,
    ) { }

    public create = (req: Request, res: Response) => {
        const [error, dto] = CreateFullBoxTemplateDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateBoxTemplate(
            this.boxTemplateRepository,
            this.boxOpcionRepository
        )
            .execute(dto!)
            .then(box => res.json(box))
            .catch(err => res.status(400).json({ error: err?.message ?? String(err) }));
    };

    public getById = async (req: Request, res: Response) => {
        try {
            const { id_box_template } = req.params;
            const box = await new GetBoxTemplate(this.boxTemplateRepository).execute(id_box_template);
            if (!box) return res.status(404).json({ error: "BoxTemplate no encontrado" });
            return res.json(box);
        } catch (err: any) {
            return res.status(400).json({ error: err?.message ?? String(err) });
        }
    };

    public update = async (req: Request, res: Response) => {
        const { id_box_template } = req.params;
        const [error, dto] = UpdateFullBoxTemplateDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new UpdateBoxTemplate(this.boxTemplateRepository, this.boxOpcionRepository)
            .execute(id_box_template, dto!)
            .then(updated => res.json(updated))
            .catch(err => res.status(400).json({ error: err.message }));
    };


    public delete = async (req: Request, res: Response) => {
        try {
            const { id_box_template } = req.params;
            const deleted = await new DeleteBoxTemplate(this.boxTemplateRepository).execute(id_box_template);
            return res.json(deleted);
        } catch (err: any) {
            return res.status(400).json({ error: err?.message ?? String(err) });
        }
    };

    public getAll = async (_req: Request, res: Response) => {
        try {
            const boxes = await new GetBoxTemplates(this.boxTemplateRepository).execute();
            res.json(boxes);
        } catch (err: any) {
            res.status(400).json({ error: err?.message ?? String(err) });
        }
    };

    public setActiveTemplate = async (req: Request, res: Response) => {
        try {
            const { id_box_template } = req.params;
            await new SetActiveBoxTemplates(this.boxTemplateRepository).execute(id_box_template);
            res.status(204).send();
        }
        catch (err: any) {
            res.status(400).json({ error: err?.message ?? String(err) });
        }
    }
}
