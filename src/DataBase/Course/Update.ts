import { DataBase } from "../Connection";
import { UpdateError } from "../../Error/CRUDerror/CRUDError";
import { UpdateCourse } from "../../Interfaces/Course/CourseUpdate";
import { HandleCrud } from "../../Error/Handler/CrudHandler";

export class CourseUpdate{
    private db: DataBase = new DataBase();

    constructor(){
    }

    async updateCourse(id: number, input: UpdateCourse): Promise<boolean>{
        return this.db.executeBoolTransaction(async (conn) => {
            try{
                if(!id)
                    throw new UpdateError("Falha ao atualizar curso.", "Talvez o parâmetro não tenha sido fornecido.");

                const params: string[] = [input.name, input.description, input.field, input.degree, input.tuitionFee];
                const filterParams: any[] = [];

                params.forEach((element) => {
                    if(element !== undefined && element !== null && element !== "")
                        filterParams.push(element);
                });

                if(filterParams.length === 0)
                    throw new UpdateError("Falha ao atualizar", "Nenhum valor fornecido.");

                filterParams.push(id);

                const SQL: string = this.updateForgeSQL(input);
                await conn.execute(SQL, filterParams);

                return true;

            }catch(err: any){
                HandleCrud(err);
                return false;
            }
        });
    }

    private updateForgeSQL(input: UpdateCourse): string{  
        const fields: string[] = ['name=?', 'description=?', 'field=?', 'degree=?', 'tuitionFee=?'];
        const params: string[] = [input.name, input.description, input.field, input.degree, input.tuitionFee];
        const values: string[] = [];

        params.forEach((element, index) => {
            if(element !== undefined && element !== null && element !== "")
                values.push(fields[index]);
        });
        
        const SQL: string = `UPDATE Course SET ${values.join(", ")} WHERE id=?`;
        
        return SQL;
    }
}