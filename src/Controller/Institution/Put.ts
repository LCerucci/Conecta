import { InstitutionUpdateService } from "../../Service/Institution/Update";
import { InstitutionUpadateData } from "../../Interfaces/Institution/InstitutionUpdate"
import { Request, Response, NextFunction } from 'express';
import { FieldError } from "../../Error/Controller/FieldError";

const Put: InstitutionUpdateService = new InstitutionUpdateService();

export class InstitutionPutController{
    constructor(){
    }

    async updateInstitution(req: Request, res: Response, next: NextFunction){
        try{
            const id: number = parseInt(req.params.id, 10);
            const params: InstitutionUpadateData =
            {
                name: req.body.name,
                educationLevel: req.body.educationLevel,
                contact: req.body.contact,
                email: req.body.email,
                address: req.body.address,
                link: req.body.link,
                description: req.body.description
            }

            if(!id)
                throw new FieldError("Erro ao atualizar curso.", "Talvez o parametro não tenha sido fornecido.");

            const result: boolean = await Put.updateInstitution(id, params);

            if(result)
                res.status(200).json({message: "Instituição atualizada com sucesso."});
            else
                res.status(400).json({message: "Falha ao atualizar a instituição."});

        }catch(err){
            console.log(err);
            next(err);
        }
    }
}
