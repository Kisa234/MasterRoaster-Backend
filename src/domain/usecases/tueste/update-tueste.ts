import { UpdateTuesteDto } from "../../dtos/tueste/update";
import { TuesteEntity } from "../../entities/tueste.entity";
import { TuesteRepository } from "../../repository/tueste.repository";
import { HistorialRepository } from "../../repository/historial.repository";
import { CreateHistorialDto } from "../../dtos/historial/create";
import { HistorialEntidad } from "../../../enums/historial-entidad.enum";
import { HistorialAccion } from "../../../enums/historial-accion.enum";

export interface UpdateTuesteUseCase {
    execute(id: string, updateTuesteDto: UpdateTuesteDto, id_user: string): Promise<TuesteEntity>;
}

export class UpdateTueste implements UpdateTuesteUseCase {
    constructor(
        private readonly tuesteRepository: TuesteRepository,
        private readonly historialRepository: HistorialRepository,
    ) {}

    async execute(id: string, updateTuesteDto: UpdateTuesteDto, id_user: string): Promise<TuesteEntity> {
        // guardar estado antes
        const antes = await this.tuesteRepository.getTuesteById(id);

        // ejecutar update
        const updated = await this.tuesteRepository.updateTueste(id, updateTuesteDto);

        // registrar historial
        const [error, dto] = CreateHistorialDto.create({
            entidad: HistorialEntidad.TUESTE,
            accion: HistorialAccion.UPDATE,
            id_entidad: id,
            id_user,
            comentario: `Edición de batch ${antes?.num_batch ?? ''} del lote tostado ${antes?.id_lote_tostado ?? ''}`,
            objeto_antes: antes,
            objeto_despues: updated,
        });

        if (error || !dto) throw new Error(error ?? 'Error al crear historial');
        await this.historialRepository.createHistorial(dto);

        return updated;
    }
}