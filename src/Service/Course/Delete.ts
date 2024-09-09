import { CourseDelete } from "../../DataBase/Course/Delete";
import { DeleteError } from "../../Error/CRUDerror/CRUDError";

const Delete: CourseDelete = new CourseDelete();

export class CourseDeleteService{
    constructor(){
    }

    async deleteCourse(id: number): Promise<boolean>{
        try{
            if(!id)
                throw new DeleteError("Erro ao deletar curso.", "Parâmentro não fornecido.");
                
            const result: boolean = await Delete.deleteCourse(id);

            return result ? result : false;

        }catch(err){
            console.log(err);
            return false;
        }
    }
}