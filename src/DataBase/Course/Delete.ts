import { conn } from "../Connection";
import { ResultSetHeader, FieldPacket } from "mysql2";
import { SQLDELETE } from "../SQLForge/CourseSQLForge";
import { DeleteError } from "../../Error/CRUDerror/CRUDError";

export class CourseDelete{
    constructor(){
    }

    async deleteCourse(id: number): Promise<boolean>{
        try{

            if(!id)
                throw new DeleteError("Erro ao deletar curso.", "Verifique se o parametro é passado corretamente.");
            
            conn.beginTransaction();

            const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQLDELETE, [id]);

            if(result.affectedRows > 0){
                conn.commit();
                return true;
            }
            else
            {
                conn.rollback();
                return false;
            }

        }catch(err){
            conn.rollback();
            console.log(err);
            return false;
        }
    }
}