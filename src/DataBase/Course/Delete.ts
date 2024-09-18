import { DataBase } from "../Connection";
import { ResultSetHeader, FieldPacket } from "mysql2";
import { DeleteError } from "../../Error/CRUDerror/CRUDError";
import { HandleCrud } from "../../Error/Handler/CrudHandler";

export class CourseDelete{
    private db: DataBase = new DataBase();
    private SQLDELETE: string = "DELETE FROM Course WHERE id=?";

    constructor(){
    }

    async deleteCourse(id: number): Promise<boolean>{
        return this.db.executeBoolTransaction(async (conn) => {
            try{

                if(!id)
                    throw new DeleteError("Erro ao deletar curso.", "Verifique se o parametro é passado corretamente.");

                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(this.SQLDELETE, [id]);

                if(result.affectedRows > 0)
                    return true;
                else
                    return false;

            }catch(err: any){
                HandleCrud(err);
                return false;
            }
        });
    }
}