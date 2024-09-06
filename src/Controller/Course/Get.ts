import { FieldError } from "../../Error/Controller/FieldError";
import { MatchError } from "../../Error/Controller/MatchError";
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

            if(!id)
                throw new FieldError("Erro ao resgatar curso.", "O parametro de busca pode não ter sido definido.");

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
            const param: string = req.body;

            if(!param)
                throw new MatchError("Erro na busca por parametros.", "O parametro pode estar nulo.");

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