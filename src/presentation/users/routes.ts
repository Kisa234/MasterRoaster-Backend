import { Router } from "express";
import { UserController } from "./controller";
import { UserDataSourceImpl } from "../../infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";

export class UserRoutes{

    static get routes():Router{
        const router = Router();

        const datasource = new UserDataSourceImpl();
        const userRepository = new UserRepositoryImpl(datasource);
        const userController = new UserController(userRepository);

        router.post('/', userController.createUser);
        router.get('/:id', userController.getUserById);
        router.get('/role/:role', userController.getUsersByRole);
        router.put('/:id', userController.updateUser);
        router.delete('/:id', userController.deleteUser);
        router.get('/', userController.getAllUsers);


        return router;
    }


}