import { CourseDelete } from "../../DataBase/Course/Delete";

const Delete: CourseDelete = new CourseDelete();

export class CourseDeleteService{
    constructor(){
    }

    async deleteCourse(id: number): Promise<boolean>{
        try{
            if(!id)
                throw new Error("input error");
                
            const result: boolean = await Delete.deleteCourse(id);

            return result ? result : false;

        }catch(err){
            console.log(err);
            return false;
        }
    }
}