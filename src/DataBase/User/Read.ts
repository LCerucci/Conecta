import { conn } from '../Connection';
import { RowDataPacket, FieldPacket } from 'mysql2';

const SQL = 'SELECT id, userName, password from User WHERE userName=?';

export class UserDB{

    constructor(){
    }

    async readUserByUserName(userName: string): Promise<RowDataPacket | null>{
        try{
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