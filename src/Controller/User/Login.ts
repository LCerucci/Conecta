import { LoginResponse } from "../../Interfaces/User";
import { Login } from "../../Service/User/Login";
import { Request, Response, NextFunction } from 'express';
import { setCookie } from "../Cookie/GenerateCookie";
import { FieldError } from "../../Error/Controller/FieldError";

export class LoginController {
    private LoginService: Login = new Login();

    constructor(){
    }

    async Login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const userName: string = req.body.userName;
            const password: string = req.body.password;

            if (!userName || !password)
                throw new FieldError("Erro ao realizar login.", "Verifique as credenciais.");

            const user: LoginResponse | null = await this.LoginService.login(userName, password);

            if (user !== null) {
                await setCookie(res, 'token', user.jwt);
                res.status(200).redirect(`/profile`);
            }
            else
                res.status(403).render('login', { message: 'Falha ao logar, verifique suas credenciais e tente novamente.' });

        } catch (err) {
            next(err);
        }
    }
}