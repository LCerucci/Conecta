import { CourseDeleteService } from "../../Service/Course/Delete";
import { Request, Response, NextFunction } from 'express';

const Delete: CourseDeleteService = new CourseDeleteService();

export class CourseDeleteController{
    constructor(){
    }

    async deleteCourse(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const id: number = parseInt(req.params.id, 10);

            if(!id)
                res.status(400).json({message: "Selecione o curso."});

            const result: boolean = await Delete.deleteCourse(id);

            if(result)
                res.status(200).json({message: "Curso deletado com sucesso."});
            else
                res.status(400).json({message: "Falha ao deletar o curso."});

        }catch(err){
            console.log();
            next(err);
        }
    }
}
