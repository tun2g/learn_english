import { Router } from "express";
import AuthController from "../../controllers/auth.c";
import { LoginEntity,RegisterEntity } from "../../entitys/auth.e";
import validateEntity from "../../middleware/validateEntity";

const AuthRouter = Router();

AuthRouter.post('/register',validateEntity(RegisterEntity),AuthController.register);
AuthRouter.post('/login',validateEntity(LoginEntity),AuthController.login);

export default AuthRouter;