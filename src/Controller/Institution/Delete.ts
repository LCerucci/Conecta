import { Request, Response, NextFunction } from "express";
import { InstituitionDeleteService } from "../../Service/Institution/Delete";
import { FieldError } from "../../Error/Controller/FieldError";

export class InstitutionDeleteController{
    private Delete: InstituitionDeleteService = new InstituitionDeleteService();


    constructor(){
    }

    async deleteInstitution(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const id: number = parseInt(req.params.id, 10);

            if(!id)
                throw new FieldError("Erro ao deletar instituição.", "O parâmetro único pode não ter sido fornecido.");

            const result: boolean = await this.Delete.deleteInstitution(id);

            if(result)
                res.status(200).json({message: "Instituição deletada com sucesso."});
            else
                res.status(404).json({message: "Falha ao deletar o recurso, talvez o mesmo não exista."});

        }catch(err){
            console.log(err);
            next(err);
        }
    }
}
