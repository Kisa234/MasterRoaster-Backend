import { Request, Response } from "express";
import { CreateAnalisisDefectosDto } from "../../domain/dtos/analisis/defectos/create";
import { CreateAnalisisDefectos } from "../../domain/usecases/analisis/defectos/create-analisisDefectos";
import { AnalisisDefectosRespository } from "../../domain/repository/analisisDefectos.repository";
import { LoteRepository } from "../../domain/repository/lote.repository";
import { AnalisisRepository } from "../../domain/repository/analisis.repository";
import { LoteAnalisisRepository } from "../../domain/repository/lote-analisis.repository";
import { MuestraAnalisisRepository } from "../../domain/repository/muestra-analisis.repository";
import { GetAnalisisDefectos } from "../../domain/usecases/analisis/defectos/get-analisisDefectos";
import { UpdateAnalisisDefectosDto } from "../../domain/dtos/analisis/defectos/update";
import { UpdateAnalisisDefectos } from "../../domain/usecases/analisis/defectos/update-analisisDefectos";
import { MuestraRepository } from "../../domain/repository/muestra.repository";
import { DeleteAnalisisDefectos } from "../../domain/usecases/analisis/defectos/delete-analisisDefectos";

export class AnalisisDefectosController {

    constructor(
        private readonly analisisDefectosRepository: AnalisisDefectosRespository,
        private readonly loteRepository: LoteRepository,
        private readonly muestraRepository: MuestraRepository,
        private readonly analisisRepository: AnalisisRepository,
        private readonly loteAnalisisRepository: LoteAnalisisRepository,
        private readonly muestraAnalisisRepository: MuestraAnalisisRepository,
    ) { }

    public createAnalisisDefectos = async (req: Request, res: Response) => {
        const id_lote = req.params.id;
        const type = req.params.type;
        const [error, createAnalisisDefectosDto] = CreateAnalisisDefectosDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new CreateAnalisisDefectos(
            this.analisisDefectosRepository,
            this.loteRepository,
            this.analisisRepository,
            this.loteAnalisisRepository,
            this.muestraAnalisisRepository,

        )
            .execute(id_lote,createAnalisisDefectosDto!,type)
            .then(analisisDefectos => res.json(analisisDefectos))
            .catch(error => res.status(400).json({ error }));
    }
    public getAnalisisDefectosById = async (req: Request, res: Response) => { 
        const id = req.params.id;
        new GetAnalisisDefectos(this.analisisDefectosRepository)
            .execute(id)
            .then(analisisDefectos => res.json(analisisDefectos))
            .catch(error => res.status(400).json({ error }));
    }
    public updateAnalisisDefectos = async (req: Request, res: Response) => { 
        const id = req.params.id;
        const type = req.params.type;
        const [error, updateAnalisisDefectosDto] = UpdateAnalisisDefectosDto.update({...req.body});
        
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateAnalisisDefectos(
            this.analisisDefectosRepository,
            this.loteRepository,
            this.analisisRepository,
            this.muestraRepository
        ).execute(id, updateAnalisisDefectosDto!, type)
            .then(analisisDefectos => res.json(analisisDefectos))
            .catch(error => res.status(400).json({ error }));
    }
    public deleteAnalisisDefectos = async (req: Request, res: Response) => { 
        const id = req.params.id;
        new DeleteAnalisisDefectos(this.analisisDefectosRepository)
            .execute(id)
            .then(analisisDefectos => res.json(analisisDefectos))
            .catch(error => res.status(400).json({ error }));
    }
}