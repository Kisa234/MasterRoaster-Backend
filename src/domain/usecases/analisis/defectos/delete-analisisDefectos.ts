import { CreateAnalisisDefectosDto } from "../../../dtos/analisis/defectos/create";
import { AnalisisDefectosEntity } from "../../../entities/analisisDefectos.entity";
import { AnalisisFisicoEntity } from "../../../entities/analisisFisico.entity";
import { AnalisisDefectosRespository } from "../../../repository/analisisDefectos.repository";


export interface DeleteAnalisisDefectosUsecase {
    execute(id:string): Promise<AnalisisDefectosEntity|null>;
}

export class DeleteAnalisisDefectos implements DeleteAnalisisDefectosUsecase {
    constructor(
        private readonly analisisDefectosRepository: AnalisisDefectosRespository
    ){}

    async execute(id:string): Promise<AnalisisDefectosEntity|null> {
        return this.analisisDefectosRepository.deleteAnalisisDefectos(id);
    }
}