import { Course } from "../../Model/Course";
import { UpdateError } from "../../Error/CRUDerror/CRUDError";
import { CourseUpdate } from "../../DataBase/Course/Update";
import { UpdateCourse } from "../../Interfaces/Course/CourseUpdate";
import { CourseRead } from "../../DataBase/Course/Read";
import { RowDataPacket } from "mysql2";

export class CourseUpdateService{
    private Update: CourseUpdate = new CourseUpdate();
    private Get: CourseRead = new CourseRead();

    constructor(){
    }

    async updateCourse(id: number, info: UpdateCourse): Promise<boolean>{
        try{
            if(!id)
                throw new UpdateError("Falha ao atualizar curso.", "Parâmetro não fonecido.");

            const getResult: RowDataPacket | null = await this.Get.readCourseById(id);

            if(getResult === null)
                return false;

            const course = new Course(getResult.name, getResult.field, getResult.description, getResult.degree, getResult.tuitionFee, undefined, getResult.id );
            
            const field: UpdateCourse = course.updateParamFilter(info);
            
            console.log(field);

            const params: UpdateCourse = {
                name: field.name,
                field: field.field,
                description: field.description,
                degree: field.degree,
                tuitionFee: field.tuitionFee
            };

            const result: boolean = await this.Update.updateCourse(id, params);

            return result? result: false;
            
        }catch (err){
            console.log(err);
            return false;
        }
    }
}