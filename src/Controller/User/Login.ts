import { LoginResponse } from "../../Interfaces/User";
import { Login } from "../../Service/User/Login";
import { Request, Response, NextFunction } from 'express';
import { setCookie } from "../Cookie/GenerateCookie";

const LoginService: Login = new Login();


export class LoginController {
    constructor(){
    }

    async Login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const userName: string = req.body.userName;
            const password: string = req.body.password;

            if (!userName || !password)
                throw new Error("nome ou senha");

            const user: LoginResponse | null = await LoginService.login(userName, password);

            if (user !== null) {
                await setCookie(res, 'token', user.jwt);
                res.status(200).json({ message: 'Bem Vindo!' });
            }
            else
                res.status(403).json({ message: 'Falha ao logar, verifique suas credenciais e tente novamente.' });

        } catch (err) {
            next(err);
        }
    }
}