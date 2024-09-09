import { RowDataPacket } from "mysql2";
import { UserDB } from "../../DataBase/User/Read";
import { UserDataResult } from "../../Interfaces/User";
import { ReadError } from "../../Error/CRUDerror/CRUDError";

const Get: UserDB = new UserDB();

export class UserGetService{
    constructor(){
    }

    async getUserByName(userName: string): Promise<UserDataResult | null>{
        try{
            if(!userName)
                throw new ReadError("Usuário não encontrado.", "Verifique o nome de usuário.");

            const info: RowDataPacket | null= await Get.readUserByUserName(userName);

            if(info !== null){
                const user: UserDataResult = 
                    {
                        id: info.id,
                        userName: info.userName,
                        name: info.name,
                        password: info.password,
                        role: info.role
                    }
                return user;
            }
            else
                return null;

        }catch(err){
            console.log(err);
            return null;
        }
    }
}