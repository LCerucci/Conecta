import { conn } from "../Connection";
import { ResultSetHeader, FieldPacket } from "mysql2";

const SQL: string = "";

export class CourseDelete{
    constructor(){
    }

    async deleteCourse(id: number): Promise<boolean>{
        try{
            conn.beginTransaction();

            const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);

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