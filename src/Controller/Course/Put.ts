import { Request, Response, NextFunction } from 'express';
import { CourseUpdateService } from "../../Service/Course/Update";
import { UpdateCourse } from "../../Interfaces/Course/CourseUpdate";
import { FieldError } from '../../Error/Controller/FieldError';
import { MatchError } from '../../Error/Controller/MatchError';

export class CoursePutController{
    private Update: CourseUpdateService = new CourseUpdateService();

    constructor(){
    }

    async updateCourse(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{

            const id: number = parseInt(req.params.id, 10);

            if(!id)
                throw new FieldError("Erro ao atualizar curso.", "O parametro único pode não ter sido passado.");

            const params: UpdateCourse = {
                name: req.body.name,
                field: req.body.field,
                description: req.body.description,
                degree: req.body.degree,
                tuitionFee: req.body.tuitionFee
            }

            console.log(params);

            if(!params)
                throw new MatchError("Erro ao atualizar curso.", "Talvez os tipos não batam com os parâmetros.")

            const result: boolean = await this.Update.updateCourse(id, params);

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