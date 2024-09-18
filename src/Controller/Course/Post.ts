import { Request, Response, NextFunction } from "express";
import { CourseCreateData } from "../../Interfaces/Course/CourseCreate"
import { CourseCreateService } from "../../Service/Course/Create";
import { MatchError } from "../../Error/Controller/MatchError";

export class CoursePostController{
    private Create: CourseCreateService = new CourseCreateService();

    constructor(){
    }

    async createCourse(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const params: CourseCreateData = {
                name: req.body.name,
                field: req.body.field,
                description: req.body.description,
                degree: req.body.degree,
                tuitionFee: req.body.tuitionFee,
                idInstitution: parseInt(req.params.idInst, 10)
            }

            if(!params)
                throw new MatchError("Erro ao criar curso.", "Os parametros podem estar vázios ou com os tipos incorretos.");

            const result: boolean = await this.Create.createCourse(params)

            if(result)
                res.status(200).json({message: "Curso criado com sucesso."});
            else
                res.status(400).json({message: "Falha ao criar o curso, talvez esse recurso já exista."});

        }catch(err){
            console.log(err);
            next(err);
        }
    }
}