import { Router } from "express";
import { UserController } from "./controller";
import { UserDataSourceImpl } from "../../infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";
import { PasswordResetTokenDataSourceImpl } from "../../infrastructure/datasources/passwordResetToken.datasource.impl";
import { PasswordResetTokenRepositoryImpl } from "../../infrastructure/repositories/passwordResetToken.repository.impl";
import { EmailService } from "../../config/email";

export class UserRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new UserDataSourceImpl();
        const userRepository = new UserRepositoryImpl(datasource);

        const passwordResetDatasource = new PasswordResetTokenDataSourceImpl();
        const passwordResetTokenRepository = new PasswordResetTokenRepositoryImpl(passwordResetDatasource);

        const emailService = new EmailService();

        const userController = new UserController(userRepository, passwordResetTokenRepository, emailService);

        // 🔐 Auth
        router.post('/login', userController.login);
        router.post('/refresh', userController.refresh);
        router.post('/logout', authMiddleware, userController.logout);
        router.get('/me', authMiddleware, userController.getSessionInfo);
        router.post('/login-pin', userController.loginPin);
        router.put('/:id/password', authMiddleware, userController.changePassword);

        // 🔑 Recuperación de contraseña (público, sin auth)
        router.post('/forgot-password', userController.forgotPassword);
        router.post('/reset-password', userController.resetPassword);

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