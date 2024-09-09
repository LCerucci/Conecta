import { conn } from "../Connection";
import { CreateError } from "../../Error/CRUDerror/CRUDError";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { SQLALL } from "../SQLForge/InstSQLForge";

export class InstitutionCreate{
    constructor(){
    }

    async createInstitution(name: string, educationLevel: string, contact: string, email: string, address: string, link: string, description: string): Promise<boolean>{
        try{

            if(!name || !educationLevel || !contact || !email || !address || !link || !description)
                throw new CreateError("Falha ao criar intituição.", "Talvez alguns parâmetros estejam faltando.");

            await conn.beginTransaction();

            const [result, _metaData]: [ResultSetHeader, FieldPacket[]] = await conn.execute(
                SQLALL, [name, educationLevel, contact, email, address, link, description]); 
            
            if(result.affectedRows > 0){
                await conn.commit();
                return true;
            }
            else{
                await conn.rollback();
                return false;
            }

        }catch(err){
            await conn.rollback();
            console.log(err);
            return false;
        }
    }
}