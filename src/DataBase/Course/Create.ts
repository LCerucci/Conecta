import { conn } from "../Connection";
import { ResultSetHeader, FieldPacket } from "mysql2";
import { SQLCREATE } from "../SQLForge/CourseSQLForge";
import { CreateError } from "../../Error/CRUDerror/CRUDError";

export class CourseCreate{
    constructor(){
    }

    async createCourse(name: string, field: string, description: string, degree: string, tuitionFee: string, idInstitution: number): Promise<boolean>{
        try{

            if(!name || !field || !description || !degree || !tuitionFee || !idInstitution)
                throw new CreateError("Erro ao criar curso.", "talvez um dos campos obrigatórios estejam vazios.");

            conn.beginTransaction();

            const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQLCREATE, [idInstitution, name, field, description, degree, tuitionFee]);

            if(result.affectedRows > 0){
                await conn.commit();
                return true
            }
            else
            {
                await conn.rollback();
                return false;
            }

        }catch(err){
            conn.rollback();
            console.log(err);
            return false;
        }
    }
}