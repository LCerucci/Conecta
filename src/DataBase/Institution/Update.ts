import { DataBase } from "../Connection";
import { UpdateError } from "../../Error/CRUDerror/CRUDError";
import { InstitutionUpadateData } from "../../Interfaces/Institution/InstitutionUpdate";
import { HandleCrud } from "../../Error/Handler/CrudHandler";


export class InstitutionUpdate{
    private db: DataBase = new DataBase();
    private message: string = "Falha ao atualizar curso.";
    private deitails: string = "Verifique o fluxo, nenhum campo foi afetado."

    constructor(){
    }

    async updateInstitution(id: number, input: InstitutionUpadateData): Promise<boolean>{
        return this.db.executeBoolTransaction(async (conn) => {
            try{
                if(!id)
                    throw new UpdateError("Falha ao atualizar recurso", "Parametro não fornecido.");

                const params: string[] = [input.name, input.educationLevel, input.contact, input.email, input.address, input.link, input.description];
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

    private updateForgeSQL(param: InstitutionUpadateData): string{  
        const fields: string[] = ['name=?', 'educationLevel=?', 'contact=?', 'email=?', 'address=?', 'link=?', 'description=?'];
        const params: string[] = [param.name, param.educationLevel, param.contact, param.email, param.address, param.link, param.description];
        const values: string[] = [];

        params.forEach((element, index) => {
            if(element !== undefined && element !== null && element !== "")
                values.push(fields[index]);
        });
        
        const SQL: string = `UPDATE Institution SET ${values.join(", ")} WHERE id=?`;
        
        return SQL;
    }
}