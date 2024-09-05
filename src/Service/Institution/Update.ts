import { InstitutionUpdate } from "../../DataBase/Institution/Update";
import { InstitutionUpadateData } from "../../Interfaces/Institution/InstitutionUpdate";

const Update: InstitutionUpdate = new InstitutionUpdate();

export class InstitutionUpdateService{
    constructor(){
    }

    async updateInstitution(id: number, params: InstitutionUpadateData): Promise<boolean>{
        try{
            if(!id)
                throw new Error("message");

            const result: boolean = await Update.updateInstitution(id, params);

            return result? result: false;

        }catch(err){
            console.log(err);
            return false;
        }
    }
}