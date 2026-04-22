import { Router } from "express";
import { UserController } from "./controller";
import { UserDataSourceImpl } from "../../infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";

export class UserRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new UserDataSourceImpl();
        const userRepository = new UserRepositoryImpl(datasource);
        const userController = new UserController(userRepository);

        // 🔐 Auth
        router.post('/login', userController.login);
        router.post('/refresh', userController.refresh);
        router.post('/logout', authMiddleware, userController.logout);
        router.get('/me', authMiddleware, userController.getSessionInfo);

        // 👥 Users (rutas específicas primero)
        router.get('/internal', authMiddleware, userController.getUsersInternal);
        router.get('/role/:role', authMiddleware, userController.getUsersByRole);

        // CRUD
        router.get('/', authMiddleware, userController.getAllUsers);
        router.post('/', authMiddleware, userController.createUser);
        router.put('/:id_user/role/:id_rol', authMiddleware, userController.AssignRoleToUser);
        router.put('/:id', authMiddleware, userController.updateUser);
        router.delete('/:id', authMiddleware, userController.deleteUser);

        // ⚠️ SIEMPRE AL FINAL
        router.get('/:id', authMiddleware, userController.getUserById);

        return router;
    }


}