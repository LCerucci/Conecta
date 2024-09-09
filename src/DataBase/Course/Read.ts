import { ReadError } from "../../Error/CRUDerror/CRUDError";
import { conn } from "../Connection";
import { getForgeParam, getForgeId, SQLALL } from "../SQLForge/CourseSQLForge";
import { RowDataPacket, FieldPacket } from "mysql2";

export class CourseRead{
    constructor(){
    }

    async readCourseById(id: number): Promise<RowDataPacket | null>{
        try{

            if(!id)
                throw new ReadError("Erro ao encontrar curso.", "Talvez o parametro não tenha sido passado.");

            await conn.beginTransaction();

            const SQL: string = getForgeId(id);

            const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(SQL, [id]);

            if(result.length > 0){
                await conn.commit();
                return result[0];
            }
            else 
            {
                await conn.rollback();
                return null;
            }
            

        }catch(err){
            await conn.rollback();
            console.log(err);
            return null;
        }
    }

    async readCourseAll(): Promise<RowDataPacket[] | null>{
        try{

            conn.beginTransaction();

            const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(SQLALL);

            if(result.length > 0){
                await conn.commit();
                return result;
            }
            else
            {
                await conn.rollback();
                return null;
            }

        }catch(err){
            conn.rollback();
            console.log(err);
            return null;
        }
    }

    async readCourseByParam(param: string): Promise<RowDataPacket[] | null> {
        try{

            if(!param)
                throw new ReadError("Falha ao buscar por parametro.", "Talvez nenhum parametro tenha sido fornecido.");

            await conn.beginTransaction();

            const SQL: string = getForgeParam(param);

            const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(SQL, [param]);

            if(result.length > 0){
                await conn.commit();
                return result;
            }
            else
            {
                await conn.rollback();
                return null;
            }

        }catch(err){
            await conn.rollback();
            console.log(err);
            return null;
        }
    }
}  