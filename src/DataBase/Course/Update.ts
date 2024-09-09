import { conn } from "../Connection";
import { ResultSetHeader, FieldPacket } from "mysql2";
import { updateForgeParam } from "../SQLForge/CourseSQLForge";
import { UpdateError } from "../../Error/CRUDerror/CRUDError";
import { UpdateCourse } from "../../Interfaces/Course/CourseUpdate";

const message: string = "Falha ao atualizar curso.";
const deitails: string = "Verifique o fluxo, nenhum campo foi afetado."

export class CourseUpdate{
    constructor(){
    }

    async updateCourse(id: number, params: UpdateCourse): Promise<boolean>{
        try{

            if(!id)
                throw new UpdateError("Falha ao atualizar curso.", "Talvez o parâmetro não tenha sido fornecido.");

            await conn.beginTransaction();

            if(params.name !== undefined){
                const SQL: string = updateForgeParam(params.name);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new UpdateError(message, deitails) 
            }

            if(params.field !== undefined){
                const SQL: string = updateForgeParam(params.field);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new UpdateError(message, deitails)  
            }

            if(params.description !== undefined){
                const SQL: string = updateForgeParam(params.description);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new UpdateError(message, deitails)  
            }

            if(params.degree !== undefined){
                const SQL: string = updateForgeParam(params.degree);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new UpdateError(message, deitails) 
            }

            if(params.tuitionFee !== undefined){
                const SQL: string = updateForgeParam(params.tuitionFee);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new UpdateError(message, deitails) 
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