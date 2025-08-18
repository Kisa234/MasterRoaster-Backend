import { CreateEnvioDto } from './../../domain/dtos/envio/create';
import { EnvioRepository } from '../../domain/repository/envio.repository';
import { CreateEnvio } from '../../domain/usecases/envio/create-envio';
import { LoteTostadoRepository } from '../../domain/repository/loteTostado.repository';
import { Request, Response } from "express";


export class EnvioController {

    constructor(
        private readonly envioRepository: EnvioRepository,
        private readonly loteTostadoRepository: LoteTostadoRepository
    ) { }


    public createEnvio = (req: Request, res: Response) => {
        const [error, dto] = CreateEnvioDto.create(req.body);
        if (error) {
            return res.status(400).json({ error }); ``
        }
        new CreateEnvio(
            this.envioRepository,
            this.loteTostadoRepository
        )
            .execute(dto!)
            .then(envio => res.json(envio))
            .catch(error => res.status(400).json({ error }));
    }

    public getEnvioById = async (req: Request, res: Response) => {
        try {
            const { id_envio } = req.params;
            const envio = await this.envioRepository.getEnvioById(id_envio);
            if (!envio) return res.status(404).json({ error: "Envío no encontrado" });
            return res.json(envio);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public updateEnvio = async (req: Request, res: Response) => {
        try {
            const { id_envio } = req.params;
            const updated = await this.envioRepository.updateEnvio(id_envio, req.body);
            return res.json(updated);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public deleteEnvio = async (req: Request, res: Response) => {
        try {
            const { id_envio } = req.params;
            const deleted = await this.envioRepository.deleteEnvio(id_envio);
            return res.json(deleted);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public getEnviosByLote = async (req: Request, res: Response) => {
        try {
            const { id_lote_tostado } = req.params;
            const envios = await this.envioRepository.getEnviosByLote(id_lote_tostado);
            return res.json(envios);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public getEnviosByCliente = async (req: Request, res: Response) => {
        try {
            const { id_cliente } = req.params;
            const envios = await this.envioRepository.getEnviosByCliente(id_cliente);
            return res.json(envios);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public getEnviosByFechaRange = async (req: Request, res: Response) => {
        try {
            const { from, to } = req.query as { from?: string; to?: string };
            if (!from || !to) {
                return res.status(400).json({ error: "Parámetros 'from' y 'to' son requeridos (YYYY-MM-DD)." });
            }

            const fromDate = new Date(from);
            const toDate = new Date(to);
            if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
                return res.status(400).json({ error: "Fechas inválidas. Use formato YYYY-MM-DD." });
            }

            const envios = await this.envioRepository.getEnviosByFechaRange(fromDate, toDate);
            return res.json(envios);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public getEnviosByClasificacion = async (req: Request, res: Response) => {
        try {
            const { clasificacion } = req.params as { clasificacion: string };
            const { from, to } = req.query as { from?: string; to?: string };

            let fromDate: Date | undefined;
            let toDate: Date | undefined;

            if (from) {
                fromDate = new Date(from);
                if (isNaN(fromDate.getTime())) {
                    return res.status(400).json({ error: "Parametro 'from' inválido (YYYY-MM-DD)." });
                }
            }
            if (to) {
                toDate = new Date(to);
                if (isNaN(toDate.getTime())) {
                    return res.status(400).json({ error: "Parametro 'to' inválido (YYYY-MM-DD)." });
                }
            }

            const envios = await this.envioRepository.getEnviosByClasificacion(
                clasificacion as any,
                fromDate,
                toDate
            );
            return res.json(envios);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };



}