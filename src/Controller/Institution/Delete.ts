import { Request, Response, NextFunction } from "express";
import { InstituitionDeleteService } from "../../Service/Institution/Delete";

const Delete: InstituitionDeleteService = new InstituitionDeleteService();

export class InstitutionDeleteController{
    constructor(){
    }

    async deleteInstitution(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const id: number = parseInt(req.params.id, 10);

            if(!id)
                throw new Error("cade o id");

            const result: boolean = await Delete.deleteInstitution(id);

            if(result)
                res.status(200).json({message: "Instituição deletada com sucesso."});
            else
                res.status(400).json({message: "Falha ao deletar o recurso."});

        }catch(err){
            console.log(err);
            next(err);
        }
    }
}
