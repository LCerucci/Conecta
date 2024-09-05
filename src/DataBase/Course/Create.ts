import { conn } from "../Connection";
import { ResultSetHeader, FieldPacket } from "mysql2";

const SQL: string = "";

export class CourseCreate{
    constructor(){
    }

    async createCourse(name: string, field: string, description: string, degree: string, tuitionFee: string, idInstitution: number): Promise<boolean>{
        try{
            conn.beginTransaction();

            const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [idInstitution, name, field, description, degree, tuitionFee]);

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