import { Request, Response, NextFunction } from 'express';
import { CourseUpdateService } from "../../Service/Course/Update";
import { UpdateCourse } from "../../Interfaces/Course/CourseUpdate";

const Update: CourseUpdateService = new CourseUpdateService();

export class CoursePutController{
    constructor(){
    }

    async updateCourse(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{

            const id: number = parseInt(req.params.id, 10);

            if(!id)
                throw new Error("cade o id");

            const params: UpdateCourse = {
                name: req.body.name,
                field: req.body.field,
                description: req.body.description,
                degree: req.body.degree,
                tuitionFee: req.body.tuitionFee
            }

            const result: boolean = await Update.updateCourse(id, params);

            if(result)
                res.status(200).json({message: "Curso atualizado com sucesso."});
            else
                res.status(400).json({message: "Falha ao atualizar o curso."});

        }catch(err){
            console.log(err);
            next(err);
        }
    }
}