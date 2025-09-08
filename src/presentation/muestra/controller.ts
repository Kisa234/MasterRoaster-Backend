
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
  ) { }

  public createMuestra = (req: Request, res: Response) => {
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
    const [error, createMuestraDto] = CreateMuestraDto.create(bodyWithUser);


    if (error) {
      return res.status(400).json({ error });
    }

    // 5. Ejecuta el caso de uso
    new CreateMuestra(this.muestraRepository, this.userRepository)
      .execute(createMuestraDto!)
      .then((muestra) => res.json(muestra))
      .catch((error) => res.status(400).json({ error }));
  };


  public getMuestraById = (req: Request, res: Response) => {
    new GetMuestra(this.muestraRepository)
      .execute(req.params.id)
      .then(muestra => res.json(muestra))
      .catch(error => res.status(400).json({ error }));

  }

  public updateMuestra = (req: Request, res: Response) => {
    const id_muestra = req.params.id;
    const [error, updateMuestraDto] = UpdateMuestraDto.update({ ...req.body, 'id_muestra': id_muestra });
    if (error) {
      return res.status(400).json({ error });
    }
    new UpdateMuestra(this.muestraRepository)
      .execute(id_muestra, updateMuestraDto!)
      .then(muestra => res.json(muestra))
      .catch(error => res.status(400).json({ error }));


  }

  public deleteMuestra = (req: Request, res: Response) => {
    const id_muestra = req.params.id;
    new DeleteMuestra(this.muestraRepository)
      .execute(id_muestra)
      .then(muestra => res.json(muestra))
      .catch(error => res.status(400).json({ error }));
  }

  public getAllMuestra = (req: Request, res: Response) => {
    new GetAllMuestra(this.muestraRepository)
      .execute()
      .then(muestras => res.json(muestras))
      .catch(error => res.status(400).json({ error }));
  }

  public completeMuestra = (req: Request, res: Response) => {
    const id_muestra = req.params.id;
    this.muestraRepository.completeMuestra(id_muestra)
      .then(muestra => res.json(muestra))
      .catch(error => res.status(400).json({ error })); 
  }
  
}