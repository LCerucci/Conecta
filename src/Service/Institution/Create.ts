import { InstitutionCreate } from "../../DataBase/Institution/Create";
import { InstitutionCreateData } from "../../Interfaces/Institution/InstitutionCreate";

const Create = new InstitutionCreate();

export class InstitutionCreateService{
    constructor(){
    }

    async createInstitution(params: InstitutionCreateData): Promise<boolean>{
        try{
            if(!params)
                throw new Error("message");

            const result: boolean = await Create.createInstitution(
                params.name,
                params.educationLevel,
                params.contact,
                params.email,
                params.address,
                params.link,
                params.description
            );

            return result? result: false;

        }catch(err){
            console.log(err)
            return false;
        }
    }
}