import { Course } from "../../Model/Course";
import { CourseCreate } from "../../DataBase/Course/Create";
import { CourseCreateData } from "../../Interfaces/Course/CourseCreate";

const Create: CourseCreate = new CourseCreate();

export class CourseCreateService{
    constructor(){
    }

    async createCourse(params: CourseCreateData): Promise<boolean>{
        try{

            const name: string = params.name;
            const field: string = params.field;
            const description: string = params.description;
            const degree: string = params.degree;
            const tuitionFee: string = params.tuitionFee;
            const idInstitution: number = params.idInstitution;

            const course: Course = new Course(name, field, description, degree, tuitionFee, idInstitution);

            const result = await Create.createCourse(name, field, description, degree, tuitionFee, idInstitution);

            return result ? result : false;

        }catch(err){
            console.log(err);
            return false;
        }
    }
}