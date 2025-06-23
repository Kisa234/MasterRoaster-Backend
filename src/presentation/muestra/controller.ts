
import { Request, Response } from "express";
import { MuestraRepository } from "../../domain/repository/muestra.repository";
import { CreateMuestraDto } from "../../domain/dtos/muestra/create";
import { CreateMuestra } from "../../domain/usecases/muestra/create-muestra";
import { GetMuestra } from "../../domain/usecases/muestra/get-muestra";
import { UpdateMuestraDto } from "../../domain/dtos/muestra/update";
import { UpdateMuestra } from "../../domain/usecases/muestra/update-muestra";
import { DeleteMuestra } from "../../domain/usecases/muestra/detele-muestra";
import { GetMuestras as GetAllMuestra } from "../../domain/usecases/muestra/get-muestras";
import { UserRepository } from "../../domain/repository/user.repository";

export class MuestraController {
    
    constructor(
        private readonly muestraRepository: MuestraRepository,
        private readonly userRepository: UserRepository,
    ) {}

    public createMuestra = (req: Request, res: Response) => {
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
      const [error, createMuestraDto] = CreateMuestraDto.create(bodyWithUser);
    
      if (error) {
        return res.status(400).json({ error });
      }
    
      new CreateMuestra(this.muestraRepository, this.userRepository)
        .execute(createMuestraDto!)
        .then((muestra) => res.json(muestra))
        .catch((error) => res.status(400).json({ error }));
    };


    public getMuestraById = (req: Request, res: Response) =>  {
        new GetMuestra(this.muestraRepository)
            .execute(req.params.id)
            .then( muestra => res.json(muestra))
            .catch( error => res.status(400).json({ error }));

    }

    public updateMuestra = (req: Request, res: Response) => {
        const id_muestra = req.params.id;
        const [error, updateMuestraDto ] = UpdateMuestraDto.update({...req.body,'id_muestra': id_muestra});
        if (error) {
            return res.status(400).json({ error });
        }
        new UpdateMuestra(this.muestraRepository)
            .execute(id_muestra,updateMuestraDto!)
            .then( muestra => res.json(muestra))
            .catch( error => res.status(400).json({ error }));


    }

    public deleteMuestra =(req: Request, res: Response) =>{
        const id_muestra = req.params.id;
        new DeleteMuestra(this.muestraRepository)
            .execute(id_muestra)
            .then( muestra => res.json(muestra))
            .catch( error => res.status(400).json({ error }));
    }

    public getAllMuestra=(req: Request, res: Response) =>{
        new GetAllMuestra(this.muestraRepository)
            .execute()
            .then( muestras => res.json(muestras))
            .catch( error => res.status(400).json({ error }));
    }
}