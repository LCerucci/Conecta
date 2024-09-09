import { Course } from "../../Model/Course";
import { UpdateError } from "../../Error/CRUDerror/CRUDError";
import { CourseUpdate } from "../../DataBase/Course/Update";
import { UpdateCourse } from "../../Interfaces/Course/CourseUpdate";

const Update: CourseUpdate = new CourseUpdate();

export class CourseUpdateService{
    constructor(){
    }

    async updateCourse(id: number, info: UpdateCourse): Promise<boolean>{
        try{
            if(!id)
                throw new UpdateError("Falha ao atualizar curso.", "Parâmetro não fonecido.");

            const course = new Course(info.name, info.field, info.description, info.degree, info.tuitionFee, undefined, id);

            const params: UpdateCourse = {
                name: course.getName(),
                field: course.getField(),
                description: course.getDescription(),
                degree: course.getDegree(),
                tuitionFee: course.getTuitionFee()
            }

            const result: boolean = await Update.updateCourse(id, params);

            return result? result: false;
            
        }catch (err){
            console.log(err);
            return false;
        }
    }
}