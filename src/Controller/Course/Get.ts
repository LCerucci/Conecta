import { CourseResult } from "../../Interfaces/Course/CourseGet";
import { CourseGetService } from "../../Service/Course/Get";
import { Request, Response, NextFunction } from "express";

const Get: CourseGetService = new CourseGetService();

export class CourseGetController{
    constructor(){
    }

    async getCourseById(req: Request, res: Response, next: NextFunction){
        try{
            const id: number = parseInt(req.params.id, 10);

            const course: CourseResult | null = await Get.getCourseById(id);

            if(course !== null)
                res.status(200).json({course});
            else
                res.status(404).json({message: "Nenhum curso encontrado."});

        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async getCourseByParam(req: Request, res: Response, next: NextFunction){
        try{
            const param = req.body;

            const courses: CourseResult[] | null = await Get.getCourseByParam(param);

            if(courses !== null)
                res.status(200).json({courses});
            else
                res.status(404).json({message: "nenhum curso encontrado."});

        }catch(err){
            console.log(err);
            next(err);
        }
    }
}