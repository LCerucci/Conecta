import { InstitutionGetService } from "../../Service/Institution/Get";
import { Request, Response, NextFunction } from 'express';
import { InstitutionDataResult } from "../../Interfaces/Institution/InstitutionRead";

const Get: InstitutionGetService = new InstitutionGetService();

export class InstitutionGetConstroller{
    constructor(){
    }

    async getInstitutionById(req: Request, res: Response, next: NextFunction){
        try{
            const id: number = parseInt(req.params.id, 10);

            if(!id)
                throw new Error("cade o id");

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
                throw new Error("cade o id");

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