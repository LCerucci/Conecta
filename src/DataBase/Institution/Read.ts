import { DataBase } from "../Connection";
import { RowDataPacket, FieldPacket } from 'mysql2';
import { ReadError } from "../../Error/CRUDerror/CRUDError";
import { HandleCrud } from "../../Error/Handler/CrudHandler";

export class InstitutionRead {
    private db: DataBase = new DataBase();
    private SQLID: string = `SELECT id, name, educationLevel, contact, email, address, link, description FROM Institution WHERE id=?`;
    private SQLALL: string = "SELECT * FROM Institution";

    constructor() {
    }

    async readInstitutionById(id: number): Promise<RowDataPacket | null> {
        return this.db.executeSelection( async (conn) => {
            try{
                if(!id)
                    throw new ReadError("Falha ao encontrar instituição.", "Talvez o parâmetro não tenha sido fornecido.");

                const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(this.SQLID, [id]);

                if(result.length > 0)
                    return result[0];
                else
                    throw new ReadError("Falha ao encontrar instituição.", "Talvez a instituição não exista.");

            }catch(err: any){
                HandleCrud(err);
                return null;
            }
        });
    }

    async readInstitutionByParam(param: string, item: string): Promise<RowDataPacket[] | null> {
        return this.db.executeSelection(async (conn) => {
            try{
                if(!param)
                    throw new ReadError("Falha ao encontrar instituição.", "Talvez o parâmetro não tenha sido fornecido.");
                
                const SQL: string = this.getForgeParam(param);
                const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(SQL, [item]);

                if(result.length > 0)
                    return result;
                else
                    throw new ReadError("Falha ao encontrar instituição.", "Talvez a instituição não exista.");

            }catch(err: any){
                HandleCrud(err);
                return null;
            }
        });
    }

    async readInstitutionAll(): Promise<RowDataPacket[] | null> {
        return this.db.executeSelection(async (conn) => {
            try{

                const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(this.SQLALL);

                if(result.length > 0)
                    return result;
                else
                    throw new ReadError("Falha ao encontrar instituição.", "Talvez não exista cadastros");

            }catch(err: any){
                HandleCrud(err);
                return null;
            }
        });
    }

    private getForgeParam(param: string): string{

        const params = ['name', 'educationLevel', 'contact', 'email', 'address', 'link']
        const finalParam = params.find((element) => (element) === param);
    
        const sql: string = `SELECT id, name, educationLevel, contact, email, address, link, description FROM Institution WHERE ${finalParam}=?`
    
        return sql;
    }
}