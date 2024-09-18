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

    async updateInstitution(id: number, params: InstitutionUpadateData): Promise<boolean>{
        return this.db.executeBoolTransaction(async (conn) => {
            try{
                if(!id)
                    throw new UpdateError("Falha ao atualizar recurso", "Parametro não fornecido.");

                const SQL: string = this.updateForgeParam(params, id);
                
                console.log(SQL);

                const updateParams: string[] = [];

                Object.keys(params).forEach((key) => {
                    if(params[key as keyof InstitutionUpadateData] !== undefined && params[key as keyof InstitutionUpadateData] !== null)
                        updateParams.push(params[key as keyof InstitutionUpadateData]);
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

    private updateForgeParam(param: InstitutionUpadateData, id: number): string{  
        const fields: string[] = ['name', 'educationLevel', 'contact', 'email', 'address', 'link', 'description'];
        const params: string[] = [];
        
        Object.keys(param).forEach(key => {
            if(param[key as keyof InstitutionUpadateData]!== undefined)
                params.push(key as keyof InstitutionUpadateData);
        });

        const finalParams: string[] = fields.filter((element) => params.includes(element));
        
        const updateFields: string = finalParams.map(field => `${field}=?`).join(', ');

        const SQL: string = `UPDATE Institution SET ${updateFields} WHERE id=${id}`;
        
        return SQL;
    }
}