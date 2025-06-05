import { LoteAnalisisRepository } from "../../domain/repository/lote-analisis.repository";
import { CreateLoteAnalisis } from "../../domain/usecases/lote-analisis/create-lote-analisis";

export class LoteAnalisisController {
    constructor(
        private readonly LoteAnalisisRepository: LoteAnalisisRepository
    ) { }

    public createLoteAnalisis = async (req: any, res: any) => {
        const [error, createLoteAnalisisDto] = req.body;
        if (error) {
            return res.status(400).json({ error });
        }
        new CreateLoteAnalisis(this.LoteAnalisisRepository).
            execute(createLoteAnalisisDto)
            .then(loteAnalisis => res.status(201).json(loteAnalisis))
            .catch(error => res.status(400).json({ error }));
    }

    public getLoteAnalisisByLote = async (req: any, res: any) => {
        const id_lote = req.params.id_lote;
        this.LoteAnalisisRepository.findByLote(id_lote)
            .then(lotesAnalisis => res.json(lotesAnalisis))
            .catch(error => res.status(400).json({ error }));
    }

    public getLoteAnalisisByAnalisis = async (req: any, res: any) => {
        const id_analisis = req.params.id_analisis;
        this.LoteAnalisisRepository.findByAnalisis(id_analisis)
            .then(lotesAnalisis => res.json(lotesAnalisis))
            .catch(error => res.status(400).json({ error }));
    }
    
}
