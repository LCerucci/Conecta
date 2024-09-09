import { UpdateError } from "../../Error/CRUDerror/CRUDError";
import { InstitutionUpdate } from "../../DataBase/Institution/Update";
import { InstitutionUpadateData } from "../../Interfaces/Institution/InstitutionUpdate";

const Update: InstitutionUpdate = new InstitutionUpdate();

export class InstitutionUpdateService{
    constructor(){
    }

    async updateInstitution(id: number, params: InstitutionUpadateData): Promise<boolean>{
        try{
            if(!id)
                throw new UpdateError("Falha ao atualizar instituição.", "Parêmetro não fornecido.");

            const result: boolean = await Update.updateInstitution(id, params);

            return result? result: false;

        }catch(err){
            console.log(err);
            return false;
        }
    }
}