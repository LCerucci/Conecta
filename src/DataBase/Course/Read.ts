import { ReadError } from "../../Error/CRUDerror/CRUDError";
import { HandleCrud } from "../../Error/Handler/CrudHandler";
import { DataBase } from "../Connection";
import { RowDataPacket, FieldPacket } from "mysql2";

export class CourseRead{
    private db: DataBase = new DataBase();
    private SQLALL: string = "SELECT * FROM Course";

    constructor(){
    }

    async readCourseById(id: number): Promise<RowDataPacket | null>{
        return this.db.executeSelection(async (conn) => {
            try{

                if(!id)
                    throw new ReadError("Erro ao encontrar curso.", "Talvez o parametro não tenha sido passado.");

                const SQL: string = this.getForgeId(id);

                const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(SQL, [id]);

                if(result.length > 0)
                    return result[0];
                else 
                    return null;                

            }catch(err: any){
                HandleCrud(err);
                return null;
            }
        });
    }

    async readCourseAll(): Promise<RowDataPacket[] | null>{
        return this.db.executeSelection(async (conn) => {
            try{

                const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(this.SQLALL);
                console.log(result);
                if(result.length > 0)
                    return result;
                else
                    return null;

            }catch(err: any){
                HandleCrud(err);
                return null;
            }
        });
    }

    async readCourseByParam(item: string, param: string): Promise<RowDataPacket[] | null> {
        return this.db.executeSelection(async (conn) => {
            try{

                if(!param)
                    throw new ReadError("Falha ao buscar por parametro.", "Talvez nenhum parametro tenha sido fornecido.");

                const SQL: string = this.getForgeParam(param);

                const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(SQL, [item]);

                if(result.length > 0)
                    return result;
                else
                    return null;

            }catch(err: any){
                HandleCrud(err);
                return null;
            }
        });
    }

    private getForgeId(id: number): string{
        const param: string = id.toString();
        const sql: string = `SELECT id, idInstitution, name, field, description, degree, tuitionFee FROM Course WHERE ${param}=?`
        
        return sql;
    }

    private getForgeParam(param: string): string{
        const params = [ 'name', 'field', 'description', 'degree', 'tuitionFee'];
        const finalParam = params.find((element) => (element) === param);

        const sql: string = `SELECT id, idInstitution, name, field, description, degree, tuitionFee FROM Course WHERE ${finalParam}=?`

        return sql;
    }
}  