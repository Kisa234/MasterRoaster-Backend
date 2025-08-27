// src/presentation/controllers/productoSku.controller.ts
import { Request, Response, NextFunction } from "express";
import { ProductoSkuRepository } from "../../domain/repository/productoSku.repository";
import { CreateProductoSkuDto } from "../../domain/dtos/producto/productoSku/create";
import { UpdateProductoSkuDto } from "../../domain/dtos/producto/productoSku/update";
import { UpsertProductoSku } from "../../domain/usecases/producto/productoSku/upsert-productoSku";
import { LoteTostadoRepository } from "../../domain/repository/loteTostado.repository";

export class ProductoSkuController {
    constructor(
        private readonly skuRepository: ProductoSkuRepository,
        private readonly LoteTostadoRepository : LoteTostadoRepository
    ) { }

    // POST /sku  (empaquetar: crea o incrementa según exista)
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [err, dto] = CreateProductoSkuDto.create(req.body);
            if (err) return res.status(400).json({ error: err });

            new UpsertProductoSku(
                this.skuRepository,
                this.LoteTostadoRepository
            )
                .execute(dto!)
                .then(producto => res.json(producto));

        } catch (e) { next(e); }
    };

    // GET /sku/:id
    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const producto = await this.skuRepository.getSkuById(req.params.id);
            if (!producto) return res.status(404).json({ error: "SKU no encontrado" });
            return res.json(producto);
        } catch (e) { next(e); }
    };

    // GET /sku
    list = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const productos = await this.skuRepository.getSkus();
            return res.json(productos);
        } catch (e) { next(e); }
    };

    // GET /sku/producto/:id_producto
    listByProducto = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productos = await this.skuRepository.getSkusByProducto(req.params.id_producto);
            return res.json(productos);
        } catch (e) { next(e); }
    };

    // GET /sku/lote-tostado/:id_lote_tostado
    listByLoteTostado = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productos = await this.skuRepository.getSkusByLoteTostado(req.params.id_lote_tostado);
            return res.json(productos);
        } catch (e) { next(e); }
    };

    // PATCH /sku/:id
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [err, dto] = UpdateProductoSkuDto.update(req.body);
            if (err) return res.status(400).json({ error: err });

            const updatedProduct = await this.skuRepository.updateSku(req.params.id, dto!);
            return res.json(updatedProduct);
        } catch (e) { next(e); }
    };

    // DELETE /sku/:id  (soft delete)
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedProduct = await this.skuRepository.deleteSku(req.params.id);
            return res.json(updatedProduct);
        } catch (e) { next(e); }
    };
}
