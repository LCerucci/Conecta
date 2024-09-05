import dotenv from 'dotenv';
import jwt, { JwtPayload, decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { setCookie } from "../Controller/Cookie/GenerateCookie";

dotenv.config();

const secret: string = process.env.SECRET as string;

export async function Authentication(req: Request, res: Response, next: NextFunction){    
    try{
        const token = req.cookies.token;
    
        if(!token)
            return res.status(401).json({message: "Acesso negado!"});

        const decoded: JwtPayload = jwt.verify(token, secret) as jwt.JwtPayload;
        const userInfo: string = JSON.stringify({ userid: decoded.userId, userName: decoded.userName, role: parseInt(decoded.role, 10) })
        
        if(!decode && !userInfo){
            await setCookie(res, 'user', userInfo);
            next();
        }
        else
            next();

    }catch(err){
        res.status(401).json({message: "Acesso negado!"});
    }
}