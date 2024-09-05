import { conn } from "../Connection";
import { ResultSetHeader, FieldPacket } from "mysql2";
import { updateForgeParam } from "../SQLForge/CourseSQLForge";
import { UpdateCourse } from "../../Interfaces/Course/CourseUpdate";

const message: string = "ops";

export class CourseUpdate{
    constructor(){
    }

    async updateCourse(id: number, params: UpdateCourse): Promise<boolean>{
        try{
            await conn.beginTransaction();

            if(params.name !== undefined){
                const SQL: string = updateForgeParam(params.name);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new Error(message) 
            }

            if(params.field !== undefined){
                const SQL: string = updateForgeParam(params.field);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new Error(message) 
            }

            if(params.description !== undefined){
                const SQL: string = updateForgeParam(params.description);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new Error(message) 
            }

            if(params.degree !== undefined){
                const SQL: string = updateForgeParam(params.degree);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new Error(message) 
            }

            if(params.tuitionFee !== undefined){
                const SQL: string = updateForgeParam(params.tuitionFee);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new Error(message) 
            }

            await conn.commit();
            return true;

        }catch(err){
            console.log(err);
            conn.rollback();
            return false;
        }
    }
}