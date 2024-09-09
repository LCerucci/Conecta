import { conn } from '../Connection';
import { ReadError } from "../../Error/CRUDerror/CRUDError";
import { RowDataPacket, FieldPacket } from 'mysql2';

const SQL = 'SELECT id, userName, password from User WHERE userName=?';

export class UserDB{

    constructor(){
    }

    async readUserByUserName(userName: string): Promise<RowDataPacket | null>{
        try{

            if(!userName)
                throw new ReadError("Usuário não encontrado.", "Talvez o nome de usuário não tenha sido fornecido.");

            const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(SQL, [userName]);

            if(result.length > 0)
               return result[0];
            else
                return null;

        }catch(err){
            console.log(err);
            return null;
        }
    }
}