import { FusionarLotes } from './../../domain/usecases/lote/lote/fusionar-lote';
import { error } from 'console';
import { Request, Response } from "express";
import { CreateLoteDto } from "../../domain/dtos/lotes/lote/create";
import { LoteRepository } from "../../domain/repository/lote.repository";
import { CreateLote, CreateLoteUseCase } from "../../domain/usecases/lote/lote/create-lote";
import { GetLoteById } from "../../domain/usecases/lote/lote/get-lote";
import { UpdateLote } from '../../domain/usecases/lote/lote/update-lote';
import { UpdateLoteDto } from "../../domain/dtos/lotes/lote/update";
import { DeleteLote } from "../../domain/usecases/lote/lote/delete.lote";
import { GetLotes } from "../../domain/usecases/lote/lote/get-lotes";
import { CreateLoteFromMuestra } from "../../domain/usecases/lote/lote/create-lote-muestra";
import { MuestraRepository } from "../../domain/repository/muestra.repository";
import { GetALLLotesTostados } from "../../domain/usecases/lote/lote/get-lotes-tostados";
import { GetAllLotesVerdes } from "../../domain/usecases/lote/lote/get-lotes-verdes";
import { GetUserByLote } from "../../domain/usecases/lote/lote/get-user-lote";
import { AnalisisRepository } from "../../domain/repository/analisis.repository";
import { AnalisisFisicoRepository } from "../../domain/repository/analisisFisico.repository";
import { AnalisisSensorialRepository } from "../../domain/repository/analisisSensorial.repository";
import { LoteAnalisisRepository } from "../../domain/repository/lote-analisis.repository";
import { UserRepository } from "../../domain/repository/user.repository";
import { CreateLoteRapidoDto } from '../../domain/dtos/lotes/lote/create-rapido';
import { CreateLoteRapido } from '../../domain/usecases/lote/lote/create-lote-rapido';
import { PedidoRepository } from '../../domain/repository/pedido.repository';
import { BlendLotes } from '../../domain/usecases/lote/lote/blend-lotes';
import { BlendLotesDto } from '../../domain/dtos/lotes/lote/blend-lotes';
import { FusionarLotesDto } from '../../domain/dtos/lotes/lote/fusionar-lotes';
import { GetLoteRoaster } from '../../domain/usecases/lote/lote/get-lote-roaster';
import { AnalisisDefectosRespository } from '../../domain/repository/analisisDefectos.repository';
import { HistorialRepository } from '../../domain/repository/historial.repository';


export class LoteController {

    constructor(
        private readonly createLoteUseCase: CreateLoteUseCase,
        private readonly loteAnalisisRepository: LoteAnalisisRepository,
        private readonly muestraRepository: MuestraRepository,
        private readonly analisisRepository: AnalisisRepository,
        private readonly analisisFisicoRepository: AnalisisFisicoRepository,
        private readonly analisisSensorialRepository: AnalisisSensorialRepository,
        private readonly analisisDefectosRepository: AnalisisDefectosRespository,
        private readonly loteRepository: LoteRepository,
        private readonly userRepository: UserRepository,
        private readonly pedidoRepository: PedidoRepository,
        private readonly historialRepository: HistorialRepository
    ) { }

    public createLote = (req: Request, res: Response) => {
        // 1. Verifica que req.user esté presente
        if (!req.user?.id) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        // 2. Decide de dónde viene el id_user:
        //    - Si el DTO entrante trae un id_user válido lo usamos.
        //    - Si no lo trae, lo tomamos del token (req.user.id).
        // Opcional: puedes añadir aquí lógica para que sólo ciertos roles
        // (p. ej. 'admin') puedan sobreescribir el id_user en el body.
        const idUserFromBody = req.body.id_user as string | undefined;
        const effectiveUserId = idUserFromBody ?? req.user.id;

        // 3. Arma el body final para el DTO
        const bodyWithUser = {
            ...req.body,
            id_user: effectiveUserId,
        };

        // 4. Crea el DTO y valida
        const [error, createLoteDto] = CreateLoteDto.create(bodyWithUser);
        if (error) {
            return res.status(400).json({ error });
        }

        new CreateLote(
            this.loteRepository,
            this.userRepository,
            this.pedidoRepository

        )
            .execute(createLoteDto!)
            .then(lote => {
                this.historialRepository.createHistorial({
                    ...req.auditContext!,
                    id_entidad: lote.id_lote,
                    id_user: req.user!.id
                });
                res.json(lote);
            })
            .catch(error => res.status(400).json({ error }));
    }

    public createLoteRapido = (req: Request, res: Response) => {
        const [error, createLoteRapidoDto] = CreateLoteRapidoDto.create(req.body);
        if (error) {
            return res.status(400).json({ error }); ``
        }

        new CreateLoteRapido(
            this.loteRepository,
            this.userRepository,
            this.pedidoRepository
        ).execute(createLoteRapidoDto!)
            .then(lote => res.json(lote))
            .catch(error => res.status(400).json({ error }));
    }

    public getLoteById = (req: Request, res: Response) => {
        new GetLoteById(this.loteRepository)
            .execute(req.params.id)
            .then(lote => res.json(lote))
            .catch(error => res.status(400).json({ error }));
    }

    public updateLote = async (req: Request, res: Response) => {
        const id_lote = req.params.id;
        const [error, updateLoteDto] = UpdateLoteDto.update({ ...req.body });
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateLote(this.loteRepository)
            .execute(req.params.id, updateLoteDto!)
            .then(lote => res.json(lote))
            .catch(error => res.status(400).json({ error }));
    }

    public deleteLote = (req: Request, res: Response) => {
        new DeleteLote(this.loteRepository)
            .execute(req.params.id)
            .then(lote => res.json(lote))
            .catch(error => res.status(400).json({ error }));
    }

    public getLotes = (req: Request, res: Response) => {
        new GetLotes(this.loteRepository)
            .execute()
            .then(lotes => res.json(lotes))
            .catch(error => res.status(400).json({ error }));
    }

    public createLoteFromMuestra = (req: Request, res: Response) => {
        const id_muestra = req.params.id;

        // 1. Verifica que req.user esté presente
        if (!req.user?.id) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        // 2. Decide de dónde viene el id_user:
        //    - Si el DTO entrante trae un id_user válido lo usamos.
        //    - Si no lo trae, lo tomamos del token (req.user.id).
        // Opcional: puedes añadir aquí lógica para que sólo ciertos roles
        // (p. ej. 'admin') puedan sobreescribir el id_user en el body.
        const idUserFromBody = req.body.id_user as string | undefined;
        const effectiveUserId = idUserFromBody ?? req.user.id;

        // 3. Arma el body final para el DTO
        const bodyWithUser = {
            ...req.body,
            id_user: effectiveUserId,
        };

        // 4. Crea el DTO y valida
        const [error, createLoteDto] = CreateLoteDto.create(bodyWithUser);
        if (!createLoteDto) {
            return res.status(400).json({ error });
        }
        new CreateLoteFromMuestra(
            this.createLoteUseCase,
            this.loteAnalisisRepository,
            this.muestraRepository,
            this.analisisRepository,
            this.analisisFisicoRepository,
            this.analisisSensorialRepository,
            this.analisisDefectosRepository,
            this.loteRepository
        )
            .execute(id_muestra, createLoteDto)
            .then(lote => res.json(lote))
            .catch(error => res.status(400).json({ error }));
    }

    public getLotesByUserId = (req: Request, res: Response) => {
        new GetLotes(this.loteRepository)
            .execute()
            .then(lotes => res.json(lotes))
            .catch(error => res.status(400).json({ error }));
    }
    public getAllTostados = async (req: Request, res: Response) => {
        new GetALLLotesTostados(this.loteRepository)
            .execute()
            .then(tuestes => res.json(tuestes))
            .catch(error => res.status(400).json({ error }));
    }
    public getAllVerdes = async (req: Request, res: Response) => {
        new GetAllLotesVerdes(this.loteRepository)
            .execute()
            .then(tuestes => res.json(tuestes))
            .catch(error => res.status(400).json({ error }));
    }
    public getUserByLote = async (req: Request, res: Response) => {
        const id = req.params.id;
        new GetUserByLote(this.loteRepository)
            .execute(id)
            .then(user => res.json(user))
            .catch(error => res.status(400).json({ error }));

    }
    public blendLotes = async (req: Request, res: Response) => {
        console.log('hola');
        const [error, dto] = BlendLotesDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new BlendLotes(
            this.loteRepository,
            this.pedidoRepository,
            this.userRepository
        )
            .execute(dto!)
            .then(lote => res.json(lote))
            .catch(error => res.status(400).json({ error }));
    }
    public FusionarLotes = async (req: Request, res: Response) => {
        const [error, dto] = FusionarLotesDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }

        new FusionarLotes(
            this.loteRepository
        )
            .execute(dto!)
            .then(lote => res.json(lote))
            .catch(error => res.status(400).json({ error }));
    }
    public getLotesRoaster = async (req: Request, res: Response) => {
        new GetLoteRoaster(
            this.loteRepository,
            this.userRepository
        )
            .execute()
            .then(lotes => res.json(lotes))
            .catch(error => res.status(400).json({ error })
            )
    }

}