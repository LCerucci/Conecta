import { Request, Response, NextFunction, Router } from "express";
import { LoginController } from "../../Controller/User/Login";

export const userRoute: Router = Router();
const Login: LoginController = new LoginController;

//Login route
userRoute.post('/login', (req: Request, res: Response, next: NextFunction) => {
    Login.Login(req, res, next);
});