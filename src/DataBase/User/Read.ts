import { DataBase } from '../Connection';
import { ReadError } from "../../Error/CRUDerror/CRUDError";
import { RowDataPacket, FieldPacket } from 'mysql2';
import { HandleCrud } from '../../Error/Handler/CrudHandler';

export class UserDB{
    private db: DataBase = new DataBase();
    private SQL = 'SELECT id, userName, password from User WHERE userName=?';

    constructor(){
    }

    async readUserByUserName(userName: string): Promise<RowDataPacket | null>{
        return this.db.executeSelection(async (conn) => {
            try{
                if(!userName)
                    throw new ReadError("Usuário não encontrado.", "Talvez o nome de usuário não tenha sido fornecido.");

                const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(this.SQL, [userName]);

                if(result.length > 0)
                    return result[0];
                else
                    return null;

            }catch(err: any){
                HandleCrud(err);
                return null;
            }
        });
    }
}