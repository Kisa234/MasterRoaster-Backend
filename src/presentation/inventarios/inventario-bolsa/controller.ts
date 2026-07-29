import { Request, Response } from "express";
import { CreateInventarioBolsaDto } from "../../../domain/dtos/inventarios/inventario-bolsa/create";
import { UpdateInventarioBolsaDto } from "../../../domain/dtos/inventarios/inventario-bolsa/update";
import { InventarioBolsaRepository } from "../../../domain/repository/inventario-bolsa";
import { CreateInventarioBolsa } from "../../../domain/usecases/inventarios/inventarios-bolsa.ts/create-inventario-bolsa";
import { UpdateInventarioBolsa } from "../../../domain/usecases/inventarios/inventarios-bolsa.ts/update-inventario-bolsa";
import { GetAllInventarioBolsas } from "../../../domain/usecases/inventarios/inventarios-bolsa.ts/get-all-inventario-bolsas";
import { GetInventarioBolsaByBolsa } from "../../../domain/usecases/inventarios/inventarios-bolsa.ts/get-inventario-bolsa-by-bolsa";
import { GetInventarioBolsaByAlmacen } from "../../../domain/usecases/inventarios/inventarios-bolsa.ts/get-inventario-bolsa-by-almacen";
import { GetInventarioBolsaByBolsaAndAlmacen } from "../../../domain/usecases/inventarios/inventarios-bolsa.ts/get-inventario-bolsa-by-bolsa-almacen";

export class InventarioBolsaController {

    constructor(
        private readonly inventarioRepository: InventarioBolsaRepository
    ) { }

    public createInventario = (req: Request, res: Response) => {
        const [error, dto] = CreateInventarioBolsaDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateInventarioBolsa(this.inventarioRepository)
            .execute(dto!)
            .then(inventario => res.json(inventario))
            .catch(error => res.status(400).json({ error: error?.message ?? String(error) }));
    };

    public updateInventario = async (req: Request, res: Response) => {
        try {
            const { id_inventario } = req.params;
            const [error, dto] = UpdateInventarioBolsaDto.update(req.body);
            if (error) return res.status(400).json({ error });

            const inventario = await new UpdateInventarioBolsa(this.inventarioRepository)
                .execute(id_inventario, dto!);

            return res.json(inventario);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public getAllInventarios = async (req: Request, res: Response) => {
        try {
            const inventarios = await new GetAllInventarioBolsas(this.inventarioRepository)
                .execute();
            return res.json(inventarios);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public getByBolsa = async (req: Request, res: Response) => {
        try {
            const { id_bolsa } = req.params;
            const inventarios = await new GetInventarioBolsaByBolsa(this.inventarioRepository)
                .execute(id_bolsa);
            return res.json(inventarios);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public getByAlmacen = async (req: Request, res: Response) => {
        try {
            const { id_almacen } = req.params;
            const inventarios = await new GetInventarioBolsaByAlmacen(this.inventarioRepository)
                .execute(id_almacen);
            return res.json(inventarios);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };

    public getByBolsaAndAlmacen = async (req: Request, res: Response) => {
        try {
            const { id_bolsa, id_almacen } = req.params;
            const inventario = await new GetInventarioBolsaByBolsaAndAlmacen(this.inventarioRepository)
                .execute(id_bolsa, id_almacen);

            if (!inventario) return res.status(404).json({ error: "Inventario no encontrado" });

            return res.json(inventario);
        } catch (error: any) {
            return res.status(400).json({ error: error?.message ?? String(error) });
        }
    };
}
