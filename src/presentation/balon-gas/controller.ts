import { Request, Response } from "express";


import { BalonGasRepository } from "../../domain/repository/balon-gas.repository";

import { CreateBalonGasDto } from "../../domain/dtos/balon-gas/create-balon-gas";
import { FinalizeBalonGasDto } from "../../domain/dtos/balon-gas/finalize-balon-gas";
import { StartBalonGasDto } from "../../domain/dtos/balon-gas/start-balon-gas";

import { GetBalonesGas } from "../../domain/usecases/balon-gas/get-balones-gas";
import { StartBalonGas } from "../../domain/usecases/balon-gas/start-balon-gas";
import { CreateBalonGas } from "../../domain/usecases/balon-gas/create-balon-gas";
import { GetBalonGasActual } from "../../domain/usecases/balon-gas/get-balon-gas-actual";
import { FinalizeBalonGas } from "../../domain/usecases/balon-gas/finalize-balon-gas";
import { GetBalonGasById } from "../../domain/usecases/balon-gas/get-balon-gas-by-id";

export class BalonGasController {

  constructor(
    private readonly balonGasRepository: BalonGasRepository
  ) {}

  public createBalonGas = async (req: Request, res: Response) => {
    const user = (req as any).user;

    const [error, dto] = CreateBalonGasDto.create({
      ...req.body,
      id_user_ingreso: user.id_user,
    });

    if (error) return res.status(400).json({ error });

    new CreateBalonGas(this.balonGasRepository)
      .execute(dto!)
      .then(balon => res.status(201).json(balon))
      .catch(error => res.status(400).json({ error }));
  };

  public startBalonGas = async (req: Request, res: Response) => {
    const user = (req as any).user;

    const [error, dto] = StartBalonGasDto.create({
      ...req.body,
      id_user_inicio_uso: user.id_user,
    });

    if (error) return res.status(400).json({ error });

    new StartBalonGas(this.balonGasRepository)
      .execute(dto!)
      .then(balon => res.json(balon))
      .catch(error => res.status(400).json({ error }));
  };

  public finalizeBalonGas = async (req: Request, res: Response) => {
    const user = (req as any).user;

    const [error, dto] = FinalizeBalonGasDto.create({
      ...req.body,
      id_user_fin_uso: user.id_user,
    });

    if (error) return res.status(400).json({ error });

    new FinalizeBalonGas(this.balonGasRepository)
      .execute(dto!)
      .then(balon => res.json(balon))
      .catch(error => res.status(400).json({ error }));
  };

  public getBalonesGas = async (req: Request, res: Response) => {
    new GetBalonesGas(this.balonGasRepository)
      .execute()
      .then(balones => res.json(balones))
      .catch(error => res.status(400).json({ error }));
  };

  public getBalonGasById = async (req: Request, res: Response) => {
    const { id_balon_gas } = req.params;

    new GetBalonGasById(this.balonGasRepository)
      .execute(id_balon_gas)
      .then(balon => res.json(balon))
      .catch(error => res.status(400).json({ error }));
  };

  public getBalonGasActual = async (req: Request, res: Response) => {
    new GetBalonGasActual(this.balonGasRepository)
      .execute()
      .then(balon => res.json(balon))
      .catch(error => res.status(400).json({ error }));
  };
}