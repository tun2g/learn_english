import { Router } from "express";
import UserController from "../../controllers/user.c";

const UserRouter = Router();

UserRouter.post('/create-new',UserController.createUser);

export default UserRouter;