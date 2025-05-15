import { CreateLoteTostadoDto } from "../../../dtos/lotes/lote-tostado/create";
import { LoteTostadoEntity } from "../../../entities/loteTostado.entity";
import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";

export default interface CreateLoteTostadoUseCase {
    execute(createLoteTostadoDto: CreateLoteTostadoDto): Promise<LoteTostadoEntity>;
}

export class CreateLoteTostado implements CreateLoteTostadoUseCase {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository
    ){}

    async execute( createLoteTostadoDto: CreateLoteTostadoDto): Promise<LoteTostadoEntity> {

        const id =  await this.generarId(createLoteTostadoDto);

        const[ ,dto] = CreateLoteTostadoDto.create({
            id_lote_tostado: id,
            id_lote: createLoteTostadoDto.id_lote,
            fecha_tostado: createLoteTostadoDto.fecha_tostado,
            peso: createLoteTostadoDto.peso,
            perfil_tostado: createLoteTostadoDto.perfil_tostado
        });

        return this.loteTostadoRepository.createLoteTostado(createLoteTostadoDto);
    }


    generarId = async (dto: CreateLoteTostadoDto): Promise<string> => {
        
        let id = '';

        //obtener la fecha actual DDMM
        const fecha = new Date();
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');

        id = `${dto.id_lote}${dia}${mes}`;

        const cantLotes = await this.loteTostadoRepository.getLoteTostados();

        id = `${id}${cantLotes.length + 1}`;

        return id; 
    }
}