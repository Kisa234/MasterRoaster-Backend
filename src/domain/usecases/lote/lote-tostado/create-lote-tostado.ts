import { CreateLoteTostadoDto } from "../../../dtos/lotes/lote-tostado/create";
import { LoteTostadoEntity } from "../../../entities/loteTostado.entity";
import { LoteTostadoRepository } from "../../../repository/loteTostado.repository";
import { LoteRepository } from "../../../repository/lote.repository";

export default interface CreateLoteTostadoUseCase {
    execute(createLoteTostadoDto: CreateLoteTostadoDto): Promise<LoteTostadoEntity>;
}

export class CreateLoteTostado implements CreateLoteTostadoUseCase {
    constructor(
        private readonly loteTostadoRepository: LoteTostadoRepository,
        private readonly loteRepository: LoteRepository,
    ) { }

    async execute(dto: CreateLoteTostadoDto): Promise<LoteTostadoEntity> {
        // Herencia obligatoria: un LoteTostado nunca decide su propio dueño ni
        // si es de tienda — siempre toma exactamente lo que tenga el Lote
        // verde padre, sin importar qué haya venido en el DTO desde el
        // controller. Esto evita que un lote tostado quede desincronizado
        // de su lote origen (ej. con id_user de un admin cuando el padre
        // era de tienda, o viceversa).
        const loteOrigen = await this.loteRepository.getLoteById(dto.id_lote);
        if (!loteOrigen) throw new Error('Lote origen no encontrado');

        dto.id_user = loteOrigen.id_user;
        dto.owned_by_store = loteOrigen.owned_by_store;

        const id = await this.generarId(dto);
        dto.id_lote_tostado = id;
        return this.loteTostadoRepository.createLoteTostado(dto);
    }


    generarId = async (dto: CreateLoteTostadoDto): Promise<string> => {
        //obtener la fecha actual DDMM
        const fecha = new Date();
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        // obtener la cantidad de lotes tostados del dia 
        const lotesTostados = await this.loteTostadoRepository.getLoteTostados();
        const lotesDelDia = lotesTostados.filter(lote => {
            return lote.fecha_tostado.getDate() == fecha.getDate()
        });
        // obtener la cantidad de lotes tostados del dia con el mismo id_lote
        const lotesMismoLote = lotesDelDia.filter(lote => {
            return lote.id_lote == dto.id_lote;
        });
        // si no hay lotes tostados del dia con el mismo id_lote, el contador es 1, sino se incrementa en 1 a la cantidad de lotes
        let contador: number;
        if (lotesMismoLote.length == 0) {
            contador = 1;
        } else {
            contador = lotesMismoLote.length + 1;
        }
        const id = `${dto.id_lote}-${dia}${mes}-${contador}`;
        return id;
    }
}