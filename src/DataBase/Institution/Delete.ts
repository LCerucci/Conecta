import { conn } from "../Connection";
import { DeleteError } from "../../Error/CRUDerror/CRUDError";
import { ResultSetHeader, FieldPacket } from "mysql2";
import { SQLDELETE } from "../SQLForge/InstSQLForge";

export class InstituitionDelete{
    constructor(){
    }

    async deleteInstitution(id: number): Promise<boolean>{
        try{

            if(!id)
                throw new DeleteError("Erro ao deletar instituição.", "Talvez o parâmetro não tenha sido fornecido.");
            
            await conn.beginTransaction();

            const [result, _metaData]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQLDELETE, [id]);

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