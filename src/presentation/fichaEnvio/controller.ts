import { Request, Response, NextFunction } from "express";
import { FichaEnvioRepository } from "../../domain/repository/fichaEnvio.repository";
import { CreateFichaEnvioDto } from "../../domain/dtos/envio/fichaEnvio/create";
import { UpdateFichaEnvioDto } from "../../domain/dtos/envio/fichaEnvio/update";

export class FichaEnvioController {
    constructor(
        private readonly fichaRepository: FichaEnvioRepository
    ) { }

    // POST /envio/:id_envio/ficha
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id_envio = req.params.id_envio;
            const [err, dto] = CreateFichaEnvioDto.create({ ...req.body, id_envio });
            if (err) return res.status(400).json({ error: err });

            const ficha = await this.fichaRepository.create(dto!);
            return res.status(201).json(ficha);
        } catch (e) {
            next(e);
        }
    };

    // GET /envio/:id_envio/ficha
    getByEnvio = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ficha = await this.fichaRepository.getByEnvio(req.params.id_envio);
            if (!ficha) return res.status(404).json({ error: "Ficha de envío no encontrada" });
            return res.json(ficha);
        } catch (e) {
            next(e);
        }
    };

    // PATCH /envio/:id_envio/ficha
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [err, dto] = UpdateFichaEnvioDto.update(req.body);
            if (err) return res.status(400).json({ error: err });

            const updated = await this.fichaRepository.updateByEnvio(req.params.id_envio, dto!);
            return res.json(updated);
        } catch (e) {
            next(e);
        }
    };

    // DELETE /envio/:id_envio/ficha
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.fichaRepository.deleteByEnvio(req.params.id_envio);
            return res.json({ ok: true });
        } catch (e) {
            next(e);
        }
    };
}
