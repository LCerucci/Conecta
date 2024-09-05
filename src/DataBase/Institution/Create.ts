import { conn } from "../Connection";
import { FieldPacket, ResultSetHeader } from "mysql2";

const SQL: string = "";

export class InstitutionCreate{
    constructor(){
    }

    async createInstitution(name: string, educationLevel: string, contact: string, email: string, address: string, link: string, description: string): Promise<boolean>{
        try{

            await conn.beginTransaction();

            const [result, _metaData]: [ResultSetHeader, FieldPacket[]] = await conn.execute(
                SQL, [name, educationLevel, contact, email, address, link, description]); 
            
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