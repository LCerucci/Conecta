import { Request, Response, NextFunction } from 'express';
import { FieldError } from "../../Error/Controller/FieldError";
import { InstitutionCreateService } from "../../Service/Institution/Create";

const Post: InstitutionCreateService = new InstitutionCreateService();

export class InstitutionPostController{
    constructor(){
    }

    async postInstitution(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const params = {
                name: req.body.name,
                educationLevel: req.body.educationLevel,
                contact: req.body.contact,
                email: req.body.email,
                address: req.body.address,
                link: req.body.link,
                description: req.body.description
            }

            if(!params)
                throw new FieldError("Erro na criação da instituição.", "Talvez algum campo esteja em branco.");

            const result: boolean = await Post.createInstitution(params);

            if(result)
                res.status(200).json({message: "Instituição criada com sucesso."});
            else
                res.status(400).json({message: "Falha ap criar curso"});

        }catch(err){
            console.log(err);
            next(err);
        }
    }
}