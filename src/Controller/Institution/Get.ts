import { InstitutionGetService } from "../../Service/Institution/Get";
import { Request, Response, NextFunction } from 'express';
import { InstitutionDataResult } from "../../Interfaces/Institution/InstitutionRead";
import { FieldError } from "../../Error/Controller/FieldError";
import { MatchError } from "../../Error/Controller/MatchError";

const Get: InstitutionGetService = new InstitutionGetService();

export class InstitutionGetConstroller{
    constructor(){
    }

    async getInstitutionById(req: Request, res: Response, next: NextFunction){
        try{
            const id: number = parseInt(req.params.id, 10);

            if(!id)
                throw new FieldError("Erro ao regatar instituição.", "Talvez o parâmetro único não tenha sido passado.");

            const institution: InstitutionDataResult | null = await Get.getInstitutionById(id);

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
            const param = req.body;

            if(!param)
                throw new MatchError("Erro ao resgatar instituições.", "");

            const institutions: InstitutionDataResult[] | null = await Get.getInstitutionByParam(param);

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