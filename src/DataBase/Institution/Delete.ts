import { DataBase } from "../Connection";
import { DeleteError } from "../../Error/CRUDerror/CRUDError";
import { ResultSetHeader, FieldPacket } from "mysql2";
import { HandleCrud } from "../../Error/Handler/CrudHandler";

export class InstituitionDelete{
    private db: DataBase = new DataBase();
    private SQLDELETE: string = `DELETE FROM Institution WHERE id=?`;

    constructor(){
    }

    async deleteInstitution(id: number): Promise<boolean>{
        return this.db.executeBoolTransaction(async (conn) => {
            try{

                if(!id)
                    throw new DeleteError("Erro ao deletar instituição.", "Talvez o parâmetro não tenha sido fornecido.");

                const [result, _metaData]: [ResultSetHeader, FieldPacket[]] = await conn.execute(this.SQLDELETE, [id]);

                if(result.affectedRows > 0)
                    return true;
                else
                    throw new DeleteError("Falha ao deleter o recurso", "Talvez o recurso não exista.");
           
            }catch (err: any){
                HandleCrud(err);
                return false;
            }
        });
    }
}