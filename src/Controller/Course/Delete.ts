import { RequestError } from "../../Error/Controller/RequestError";
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
                throw new RequestError("Erro na deleção do curso.", "O paramêtro de deleção pode não ter sido fornecido.")

            const result: boolean = await Delete.deleteCourse(id);

            if(result)
                res.status(200).json({message: "Curso deletado com sucesso."});
            else
                res.status(404).json({message: "Falha ao deletar o curso, pode ser que ete curso não exista."});

        }catch(err){
            console.log();
            next(err);
        }
    }
}
