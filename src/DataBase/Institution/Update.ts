import { conn } from "../Connection";
import { ResultSetHeader, FieldPacket } from "mysql2";
import { updateForgeParam } from "../SQLForge/InstSQLForge";
import { InstitutionUpadateData } from "../../Interfaces/Institution/InstitutionUpdate";

const message: string = "Fail to update.";

export class InstitutionUpdate{
    constructor(){
    }

    async updateInstitution(id: number, params: InstitutionUpadateData): Promise<boolean>{
        try{
            await conn.beginTransaction();

            if(params.name !== undefined){
                const SQL: string = updateForgeParam(params.name);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new Error(message) 
            }

            if(params.address !== undefined){
                const SQL: string = updateForgeParam(params.address);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new Error(message) 
            }

            if(params.contact !== undefined){
                const SQL: string = updateForgeParam(params.contact);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new Error(message) 
            }

            if(params.description !== undefined){
                const SQL: string = updateForgeParam(params.description);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new Error(message) 
            }

            if(params.educationLevel !== undefined){
                const SQL: string = updateForgeParam(params.educationLevel);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new Error(message) 
            }

            if(params.email !== undefined){
                const SQL: string = updateForgeParam(params.email);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new Error(message) 
            }

            if(params.link !== undefined){
                const SQL: string = updateForgeParam(params.link);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new Error(message) 
            }

            await conn.commit();
            return true;

        }catch(err){
            console.log(err);
            conn.rollback();
            return false;
        }
    }
}