import { LoteTostadoEntity } from "../../../entities/loteTostado.entity";
import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";

export interface GetLoteTostadoByUserUseCase {
  execute(id_user: string, incluirEliminados?: boolean): Promise<LoteTostadoEntity[]>;
}

export class GetLoteTostadoByUser implements GetLoteTostadoByUserUseCase {
  constructor(private readonly loteTostadoRepository: LoteTostadoRepository) {}

  execute(id_user: string, incluirEliminados: boolean = false): Promise<LoteTostadoEntity[]> {
    return this.loteTostadoRepository.getLoteTostadoByUser(id_user, incluirEliminados);
  }
}