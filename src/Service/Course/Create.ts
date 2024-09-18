import { Course } from "../../Model/Course";
import { CourseCreate } from "../../DataBase/Course/Create";
import { CreateError } from "../../Error/CRUDerror/CRUDError";
import { CourseCreateData } from "../../Interfaces/Course/CourseCreate";

const Create: CourseCreate = new CourseCreate();

export class CourseCreateService{
    constructor(){
    }

    async createCourse(params: CourseCreateData): Promise<boolean>{
        try{

            if(!params)
                throw new CreateError("Parametros não atendidos.", "verifique os campos de criação do curso.");

            const name: string = params.name;
            const field: string = params.field;
            const description: string = params.description;
            const degree: string = params.degree;
            const tuitionFee: string = params.tuitionFee;
            const idInstitution: number = params.idInstitution;

            const course: Course = new Course(name, field, description, degree, tuitionFee, idInstitution);
            const idInst: number | undefined = course.getIdInstitution();

            if(typeof idInst === 'number'){
                const result = await Create.createCourse(
                    course.getName(), 
                    course.getField(), 
                    course.getDescription(), 
                    course.getDegree(),
                    course.getTuitionFee(), 
                    idInst);
                
                return result
            }
            else
            {
                throw new CreateError("Falha ao criar curso(service).", "Talvez o id da instituição não tenha diso fornecido.");
            }

        }catch(err){
            console.log(err);
            return false;
        }
    }
}