import { LoteAnalisisRepository } from "../../domain/repository/lote-analisis.repository";
import { MuestraAnalisisRepository } from "../../domain/repository/muestra-analisis.repository";
import { CreateLoteAnalisis } from "../../domain/usecases/lote-analisis/create-lote-analisis";

export class MuestraAnalisisController {
    constructor(
        private readonly muestraAnalisisRepository: MuestraAnalisisRepository
    ) { }

    public createMuestraAnalisis = async (req: any, res: any) => {
        const [error, createMuestraAnalisisDto] = req.body;
        if (error) {
            return res.status(400).json({ error });
        }
        this.muestraAnalisisRepository.create(createMuestraAnalisisDto)
            .then(muestraAnalisis => res.status(201).json(muestraAnalisis))
            .catch(error => res.status(400).json({ error }));
    }

    public getMuestraAnalisisByMuestra = async (req: any, res: any) => {
        const id_muestra = req.params.id_muestra;
        this.muestraAnalisisRepository.findByMuestra(id_muestra)
            .then(muestrasAnalisis => res.json(muestrasAnalisis))
            .catch(error => res.status(400).json({ error }));
    }

    public getMuestraAnalisisByAnalisis = async (req: any, res: any) => {
        const id_analisis = req.params.id_analisis;
        this.muestraAnalisisRepository.findByAnalisis(id_analisis)
            .then(muestrasAnalisis => res.json(muestrasAnalisis))
            .catch(error => res.status(400).json({ error }));
    }
    
}
