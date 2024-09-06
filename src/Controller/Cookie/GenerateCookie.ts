import { Response } from "express";
import { FieldError } from "../../Error/Controller/FieldError";

const maxAge: number = 1000 * 60 * 60 * 60;

export async function setCookie(res: Response, name: string, record: string | any): Promise<Response>{
    try{
        if(!res || !name || !record)
            throw new FieldError("Erro nos campos de Cookies.", "Algum dos argumentos podem estar vazios.");

        return res.cookie(name, record, {maxAge:maxAge, httpOnly: true, secure: true, sameSite: 'strict', path:'/'});
    
    }catch(err){
        return res.status(500).json({message: "Ops, algo deu errado."});
    }
}