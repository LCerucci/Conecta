import { UserGetService } from "./Get";
import { LoginJSON } from "../../Interfaces/User";
import { LoginResponse} from "../../Interfaces/User";
import { AuthError } from "../../Error/Auth/AuthError";
import { UserDataResult } from "../../Interfaces/User";
import { generateJWT } from "../../Service/Auth/GenerateJwt";
import { verifyPassword } from "../../Service/Auth/VerifyPassword";


const Get : UserGetService = new UserGetService();

export class Login{
    constructor(){
    }

    async login(userName: string, password: string): Promise<LoginResponse | null> {
        try {
            if (!userName || !password)
                throw new AuthError("Credenciais não fornecidas.", "Verifique as credenciais.");
    
            const user: UserDataResult | null = await Get.getUserByName(userName);
    
            if (user !== null) {
                const verify: boolean = await verifyPassword(password, user.password);
    
                if (verify) {
                    const payload: LoginJSON = { userId: user.id, userName: user.userName, role: user.role };
                    const jasonWebToken: string | null = generateJWT(payload);
                    const result: LoginResponse = { jwt: jasonWebToken };
    
                    return result;
                }
                else
                    return null;
            }
            else
                return null;
    
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}