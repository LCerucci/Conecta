import { DataBase } from "../Connection";
import { UpdateError } from "../../Error/CRUDerror/CRUDError";
import { UpdateCourse } from "../../Interfaces/Course/CourseUpdate";
import { HandleCrud } from "../../Error/Handler/CrudHandler";

export class CourseUpdate{
    private db: DataBase = new DataBase();
    private message: string = "Falha ao atualizar curso.";
    private deitails: string = "Verifique o fluxo, nenhum campo foi afetado."

    constructor(){
    }

    async updateCourse(id: number, params: UpdateCourse): Promise<boolean>{
        return this.db.executeBoolTransaction(async (conn) => {
            try{
                if(!id)
                    throw new UpdateError("Falha ao atualizar curso.", "Talvez o parâmetro não tenha sido fornecido.");

                const SQL: string = this.updateForgeParam(params, id);
                
                console.log(SQL);

                const updateParams: string[] = [];

                Object.keys(params).forEach((key) => {
                    if(params[key as keyof UpdateCourse] !== undefined && params[key as keyof UpdateCourse] !== null)
                        updateParams.push(params[key as keyof UpdateCourse]);
                });

                if(!SQL || !updateParams)
                    throw new UpdateError(this.message, this.deitails);

                await conn.execute(SQL, updateParams);
                return true;

            }catch(err: any){
                HandleCrud(err);
                return false;
            }
        });
    }

    private updateForgeParam(param: UpdateCourse, id: number): string{  
        const fields: string[] = ['name', 'description', 'field', 'degree', 'tuitionFee'];
        const params: string[] = [];
        
        Object.keys(param).forEach(key => {
            if(param[key as keyof UpdateCourse]!== undefined)
                params.push(key as keyof UpdateCourse);
        });

        const finalParams: string[] = fields.filter((element) => params.includes(element));
        
        const updateFields: string = finalParams.map(field => `${field}=?`).join(', ');

        const SQL: string = `UPDATE Course SET ${updateFields} WHERE id=${id}`;
        
        return SQL;
    }
}