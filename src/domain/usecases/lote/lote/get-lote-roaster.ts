import { LoteRepository } from '../../../repository/lote.repository';
import { LoteEntity } from "../../../entities/lote.entity";
import { UserRepository } from '../../../repository/user.repository';



export interface GetLoteRoasterUseCase {
    execute( ): Promise<LoteEntity[]>;
}

export class GetLoteRoaster implements GetLoteRoasterUseCase {
    constructor(
        private readonly loteRepository: LoteRepository,
        private readonly userRepository: UserRepository
    ){}

    async execute(  ): Promise<LoteEntity[]> {
        return await this.loteRepository.getLotes().then(async (lotes) => {
            const lotesWithUser = await Promise.all(lotes.map(async (lote) => {
                const user = await this.userRepository.getUserById(lote.id_user ? lote.id_user : '');
                if (user?.rol == 'admin'){
                    return lote;
                }
                return undefined;
            }));
            return lotesWithUser.filter((lote): lote is LoteEntity => lote !== undefined);
        })
    }
}