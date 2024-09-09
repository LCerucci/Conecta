import { RowDataPacket } from "mysql2";
import { Course } from "../../Model/Course";
import { CourseRead } from "../../DataBase/Course/Read";
import { CourseResult } from "../../Interfaces/Course/CourseGet";
import { ReadError } from "../../Error/CRUDerror/CRUDError";

const Get: CourseRead = new CourseRead();

export class CourseGetService {
    constructor() {
    }

    async getCourseById(id: number): Promise<CourseResult | null> {
        try {
            if (!id)
                throw new ReadError("Falha ao procurar curso.", "Parâmetro não fornecido.");

            const result: RowDataPacket | null = await Get.readCourseById(id);

            if (result !== null) {
                const id: number = result.id;
                const idInst: number = result.idInst;
                const name: string = result.name;
                const field: string = result.field;
                const description: string = result.description;
                const degree: string = result.degree;
                const tuitionFee: string = result.tuitionFee;

                const course: Course = new Course(name, field, description, degree, tuitionFee, idInst, id);

                return course.CourseJSON();
            }
            else
                return null;

        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getCourseByParam(param: string): Promise<CourseResult[] | null> {
        try {

            let result : RowDataPacket[] | null;

            if (!param)
                result = await Get.readCourseAll();
            else
                result = await Get.readCourseByParam(param);

            if (result !== null) {
                const info: Course[] = result.map((element) => {
                    return new Course(
                        element.id,
                        element.idInst,
                        element.name,
                        element.field,
                        element.description,
                        element.degree,
                        element.tuitionFee
                    );
                });

                const courses: CourseResult[] = info.map(element => element.CourseJSON());

                return courses;
            }
            else
                return null;

        } catch (err) {
            console.log(err);
            return null;
        }
    }
}