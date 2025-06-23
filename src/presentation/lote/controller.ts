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

export class LoteController {

    constructor (
        private readonly createLoteUseCase: CreateLoteUseCase,
        private readonly loteAnalisisRepository: LoteAnalisisRepository,
        private readonly muestraRepository: MuestraRepository,
        private readonly analisisRepository: AnalisisRepository,
        private readonly analisisFisicoRepository: AnalisisFisicoRepository,
        private readonly analisisSensorialRepository: AnalisisSensorialRepository,
        private readonly loteRepository: LoteRepository,
        private readonly userRepository: UserRepository,
    ){}

    public createLote = (req:Request , res : Response) => {
        // 1. Verifica que req.user esté presente
        if (!req.user?.id) {
          return res.status(401).json({ error: 'Usuario no autenticado' });
        }
      
        // 2. Inyecta id_user en el body antes de construir el DTO
        const bodyWithUser = {
          ...req.body,
          id_user: req.user.id, // ← Viene del token, no del cliente
        };
      
        // 3. Construye el DTO ya con id_user inyectado
        const [error, createLoteDto] = CreateLoteDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        new CreateLote(
            this.loteRepository,
            this.userRepository,
        )
            .execute(createLoteDto!)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public getLoteById = (req:Request , res : Response) => {
        new GetLoteById(this.loteRepository)
            .execute(req.params.id)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public updateLote = (req:Request , res : Response) => {
        const id_lote = req.params.id;
        const [error, updateLoteDto] = UpdateLoteDto.update({...req.body, 'id_lote ': id_lote});
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateLote(this.loteRepository)
            .execute(req.params.id, updateLoteDto!)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public deleteLote = (req:Request , res : Response) => {
        new DeleteLote(this.loteRepository)
            .execute(req.params.id)
            .then( lote => res.json(lote))
            .catch( error => res.status(400).json({ error }));
    }

    public getLotes = (req:Request , res : Response) => {
        new GetLotes(this.loteRepository)
        .execute()
        .then( lotes => res.json(lotes))
        .catch( error => res.status(400).json({ error }));
    }
    
    public createLoteFromMuestra = (req:Request , res : Response) => {
        const id_muestra = req.params.id;
        const peso = req.body.peso;
        if (!peso) {
            return res.status(400).json({ error: 'Peso is required' });
        }
        new CreateLoteFromMuestra(
            this.createLoteUseCase,
            this.loteAnalisisRepository,
            this.muestraRepository,
            this.analisisRepository,
            this.analisisFisicoRepository,
            this.analisisSensorialRepository,
            this.loteRepository
        )
        .execute(id_muestra, peso)
        .then( lote => res.json(lote))
        .catch( error => res.status(400).json({ error }));
    }
    
    public getLotesByUserId = (req:Request , res : Response) => {
        new GetLotes(this.loteRepository)
        .execute()
        .then( lotes => res.json(lotes))
        .catch( error => res.status(400).json({ error }));
    }
    public getAllTostados = async (req: Request, res: Response) => {
        new GetALLLotesTostados(this.loteRepository)
            .execute()
            .then( tuestes => res.json(tuestes))
            .catch( error => res.status(400).json({ error}));
    }
    public getAllVerdes = async (req: Request, res: Response) => {
        new GetAllLotesVerdes(this.loteRepository)
            .execute()
            .then( tuestes => res.json(tuestes))
            .catch( error => res.status(400).json({ error}));
    }
    public getUserByLote = async (req: Request, res: Response) => {
        const id = req.params.id;
        new GetUserByLote(this.loteRepository)
            .execute(id)
            .then(user => res.json(user))
            .catch( error => res.status(400).json({ error}));

    }

}