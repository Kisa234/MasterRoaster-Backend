import { CreateAnalisisDefectosDto } from "../../../dtos/analisis/defectos/create";
import { AnalisisDefectosEntity } from "../../../entities/analisisDefectos.entity";
import { AnalisisFisicoEntity } from "../../../entities/analisisFisico.entity";
import { AnalisisDefectosRespository } from "../../../repository/analisisDefectos.repository";


export interface GetAnalisisDefectosUsecase {
    execute(id:string): Promise<AnalisisDefectosEntity|null>;
}

export class GetAnalisisDefectos implements GetAnalisisDefectosUsecase {
    constructor(
        private readonly analisisDefectosRepository: AnalisisDefectosRespository
    ){}

    async execute(id:string): Promise<AnalisisDefectosEntity|null> {
        return this.analisisDefectosRepository.getAnalisisDefectosById(id);
    }
}