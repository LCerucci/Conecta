import { conn } from "../Connection";
import { ResultSetHeader, FieldPacket } from "mysql2";
import { updateForgeParam } from "../SQLForge/InstSQLForge";
import { UpdateError } from "../../Error/CRUDerror/CRUDError";
import { InstitutionUpadateData } from "../../Interfaces/Institution/InstitutionUpdate";


export class InstitutionUpdate{
    constructor(){
    }

    async updateInstitution(id: number, params: InstitutionUpadateData): Promise<boolean>{
        try{
            await conn.beginTransaction();

            if(params.name !== undefined){
                const SQL: string = updateForgeParam(params.name);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new UpdateError("Falha ao atualizar campo.", "Talvez o tipo esteja incorreto ou o valor se perdido."); 
            }

            if(params.address !== undefined){
                const SQL: string = updateForgeParam(params.address);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new UpdateError("Falha ao atualizar campo.", "Talvez o tipo esteja incorreto ou o valor se perdido."); 
            }

            if(params.contact !== undefined){
                const SQL: string = updateForgeParam(params.contact);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new UpdateError("Falha ao atualizar campo.", "Talvez o tipo esteja incorreto ou o valor se perdido."); 
            }

            if(params.description !== undefined){
                const SQL: string = updateForgeParam(params.description);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new UpdateError("Falha ao atualizar campo.", "Talvez o tipo esteja incorreto ou o valor se perdido."); 
            }

            if(params.educationLevel !== undefined){
                const SQL: string = updateForgeParam(params.educationLevel);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new UpdateError("Falha ao atualizar campo.", "Talvez o tipo esteja incorreto ou o valor se perdido."); 
            }

            if(params.email !== undefined){
                const SQL: string = updateForgeParam(params.email);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new UpdateError("Falha ao atualizar campo.", "Talvez o tipo esteja incorreto ou o valor se perdido."); 
            }

            if(params.link !== undefined){
                const SQL: string = updateForgeParam(params.link);
                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(SQL, [id]);
                if(result.affectedRows === 0) throw new UpdateError("Falha ao atualizar campo.", "Talvez o tipo esteja incorreto ou o valor se perdido."); 
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