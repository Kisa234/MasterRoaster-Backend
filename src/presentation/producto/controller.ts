import { Request, Response, NextFunction } from "express";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { CreateProductoDto } from "../../domain/dtos/producto/producto/create";
import { UpdateProductoDto } from "../../domain/dtos/producto/producto/update";
import { CreateProducto } from "../../domain/usecases/producto/producto/create-producto";
import { LoteRepository } from "../../domain/repository/lote.repository";
import { UserRepository } from "../../domain/repository/user.repository";

export class ProductoController {
    constructor(
        private readonly productoRepository: ProductoRepository,
        private readonly loteRepository: LoteRepository,
        private readonly userRepository: UserRepository
    ) { }

    // POST /producto
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [err, dto] = CreateProductoDto.create(req.body);
            if (err) return res.status(400).json({ error: err });
            const usecase = new CreateProducto(
                this.productoRepository,
                this.loteRepository,
                this.userRepository
            );

            const producto = await usecase.execute(dto!);
            return res.status(201).json(producto);
        } catch (e) {
            next(e);
        }
    };

    // GET /producto/:id
    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const p = await this.productoRepository.getProductoById(req.params.id);
            if (!p) return res.status(404).json({ error: "Producto no encontrado" });
            return res.json(p);
        } catch (e) { next(e); }
    };

    // GET /producto
    list = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const productos = await this.productoRepository.getProductos();
            return res.json(productos);
        } catch (e) { next(e); }
    };

    // GET /producto/activos
    listActivos = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const productos = await this.productoRepository.getProductosActivos();
            return res.json(productos);
        } catch (e) { next(e); }
    };

    // GET /producto/lote/:id_lote
    listByLote = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productos = await this.productoRepository.getProductosByLote(req.params.id_lote);
            return res.json(productos);
        } catch (e) { next(e); }
    };

    // GET /producto/search?q=texto
    search = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const q = String(req.query.q ?? "");
            if (!q.trim()) return res.json([]);
            const productos = await this.productoRepository.buscarProductos(q);
            return res.json(productos);
        } catch (e) { next(e); }
    };

    // PATCH /producto/:id
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [err, dto] = UpdateProductoDto.update(req.body);
            if (err) return res.status(400).json({ error: err });

            const updated = await this.productoRepository.updateProducto(req.params.id, dto!);
            return res.json(updated);
        } catch (e) { next(e); }
    };

    // PATCH /producto/:id/activo  { activo: boolean }
    toggleActivo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { activo } = req.body;
            if (typeof activo !== "boolean") {
                return res.status(400).json({ error: "activo debe ser boolean" });
            }
            const updated = await this.productoRepository.toggleProductoActivo(req.params.id, activo);
            return res.json(updated);
        } catch (e) { next(e); }
    };

    // PATCH /producto/:id/lote  { id_lote: string | null }
    vincularLote = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id_lote } = req.body as { id_lote: string | null };
            const updated = await this.productoRepository.vincularLote(req.params.id, id_lote ?? null);
            return res.json(updated);
        } catch (e) { next(e); }
    };

    // DELETE /producto/:id (baja lógica = activo:false en tu impl)
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updated = await this.productoRepository.deleteProducto(req.params.id);
            return res.json(updated);
        } catch (e) { next(e); }
    };
}
