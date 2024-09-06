import { MatchError } from "../Controller/MatchError";
import { FieldError } from "../Controller/FieldError";
import { RequestError } from "../Controller/RequestError";
import { Request, Response, NextFunction } from "express";

export function RequestHandler(err: Error, _req: Request, res: Response, _next: NextFunction){
    logError(err);

    if(err instanceof RequestError || err instanceof MatchError){
        res.status(err.statusCode).json({message: "Verifique os campos e tente novamente."});
    }
    else if(err instanceof FieldError){
        res.status(err.statusCode).json({message: "Valores atribuidos incorretamente."});
    }
    else{
        res.status(500).json({message: "Algo deu errado. Tente novamente mais tarde."});
    }
}

function logError(err: Error): void {
    console.error(`Erro na requisição: ${err.name}, ${err.message}, stack: ${err.stack}`);

    if(err instanceof RequestError || err instanceof MatchError)
        console.error(`Details: ${err.details}`);
}