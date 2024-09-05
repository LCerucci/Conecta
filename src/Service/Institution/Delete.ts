import { InstituitionDelete } from "../../DataBase/Institution/Delete";

const Delete: InstituitionDelete = new InstituitionDelete();

export class InstituitionDeleteService{
    constructor(){
    }

    async deleteInstitution(id: number): Promise<boolean>{
        try{
            if(!id)
                throw new Error("message");

            const result: boolean = await Delete.deleteInstitution(id);

            return result? result: false;

        }catch(err){
            console.log(err);
            return false;
        }
    }
}