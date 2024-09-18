import { DataBase } from "../Connection";
import { CreateError } from "../../Error/CRUDerror/CRUDError";
import { HandleCrud } from "../../Error/Handler/CrudHandler";
import { FieldPacket, ResultSetHeader } from "mysql2";

export class InstitutionCreate{
    private db: DataBase = new DataBase();
    private SQL: string = `INSERT INTO Institution(name, educationLevel, contact, email, address, link, description) VALUES(?,?,?,?,?,?,?)`;

    constructor(){
    }

    async createInstitution(name: string, educationLevel: string, contact: string, email: string, address: string, link: string, description: string): Promise<boolean>{
        return this.db.executeBoolTransaction(async (conn) => {
            try{
                if(!name || !educationLevel || !contact || !email || !address || !link || !description)
                    throw new CreateError("Falha ao criar intituição.", "Talvez alguns parâmetros estejam faltando.");

                const [result, _metaData]: [ResultSetHeader, FieldPacket[]] = await conn.execute(
                this.SQL, [name, educationLevel, contact, email, address, link, description]);

                if(result.affectedRows > 0)
                    return true;
                else 
                    throw new CreateError("Falha ao criar recurso.", "Talvez já exista.");
                
            }catch (err: any){
                HandleCrud(err);
                return false;
            }
        });
    }
}