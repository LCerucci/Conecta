import { InstitutionGetService } from "../../Service/Institution/Get";
import { Request, Response, NextFunction } from 'express';
import { InstitutionDataResult } from "../../Interfaces/Institution/InstitutionRead";
import { FieldError } from "../../Error/Controller/FieldError";

export class InstitutionGetConstroller{
    private Get: InstitutionGetService = new InstitutionGetService();

    constructor(){
    }

    async getInstitutionById(req: Request, res: Response, next: NextFunction){
        try{
            const id: number = parseInt(req.params.id, 10);

            if(!id)
                throw new FieldError("Erro ao regatar instituição.", "Talvez o parâmetro único não tenha sido passado.");

            const institution: InstitutionDataResult | null = await this.Get.getInstitutionById(id);

            if(institution !== null)
                res.status(200).json({institution});
            else
                res.status(404).json({message: "Instituição não encontrada."});

        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async getInstitutionByParams(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const param = req.body.param;
            const item = req.body.item;

            const institutions: InstitutionDataResult[] | null = await this.Get.getInstitutionByParam(item, param);

            if(institutions !== null)
                res.status(200).json({institutions});
            else
                res.status(404).json({message: "nenhum curso encontrado."});

        }catch(err){
            console.log(err);
            next(err);
        }
    }
}