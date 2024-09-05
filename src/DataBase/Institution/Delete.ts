import { conn } from "../Connection";
import { ResultSetHeader, FieldPacket } from "mysql2";

const SQL: string = "";

export class InstituitionDelete{
    constructor(){
    }

    async deleteInstitution(id: number): Promise<boolean>{
        try{
            await conn.beginTransaction();

            const [result, _metaData]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);

            if(result.affectedRows > 0)
            {
                await conn.commit();
                return true;
            }
            else
            {
                await conn.rollback();
                return false;
            }

        }catch(err){
            await conn.rollback();
            console.log(err);
            return false;
        }
    }
}