import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { LoginJSON } from '../../Interfaces/User';

dotenv.config();

const secret: string = process.env.SECRET as string;

export function generateJWT(param: LoginJSON): string | null {
    try{

        console.log(param);

        if(!param.role || !param.userId || !param.userName)
            throw new Error("message");

        return jwt.sign(param, secret, { expiresIn: '1h' });

    }catch (err){
        console.log(err);
        return null;
    }
}