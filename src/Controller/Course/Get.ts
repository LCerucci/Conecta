import { FieldError } from "../../Error/Controller/FieldError";
import { MatchError } from "../../Error/Controller/MatchError";
import { CourseResult } from "../../Interfaces/Course/CourseGet";
import { CourseGetService } from "../../Service/Course/Get";
import { Request, Response, NextFunction } from "express";

export class CourseGetController{
    private Get: CourseGetService = new CourseGetService();

    constructor(){
    }

    async getCourseById(req: Request, res: Response, next: NextFunction){
        try{
            const id: number = parseInt(req.params.id, 10);

            if(!id)
                throw new FieldError("Erro ao resgatar curso.", "O parametro de busca pode não ter sido definido.");

            const course: CourseResult | null = await this.Get.getCourseById(id);

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
            const param: string = req.body.param;
            const item: string = req.body.item;

            const courses: CourseResult[] | null = await this.Get.getCourseByParam(item, param);

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