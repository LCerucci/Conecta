import { DataBase } from "../Connection";
import { ResultSetHeader, FieldPacket } from "mysql2";
import { HandleCrud } from "../../Error/Handler/CrudHandler";
import { CreateError } from "../../Error/CRUDerror/CRUDError";

export class CourseCreate{
    private db: DataBase = new DataBase();
    private SQLCREATE: string = `INSERT INTO Course(idInstitution, name, description, field, degree, tuitionFee) VALUES (?, ?, ?, ?, ?, ?)`; 
    
    constructor(){}

    async createCourse(name: string, field: string, description: string, degree: string, tuitionFee: string, idInstitution: number): Promise<boolean>{
        return this.db.executeBoolTransaction(async (conn) => {
            try{
                console.log(idInstitution);
                if(!name || !field || !description || !degree || !tuitionFee || !idInstitution)
                    throw new CreateError("Erro ao criar curso.", "talvez um dos campos obrigatórios estejam vazios.");

                const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(this.SQLCREATE, [idInstitution, name, description, field, degree, tuitionFee]);

                if(result.affectedRows > 0)
                    return true;
                else
                    throw new CreateError("Erro ao criar recurso", "Talvez o recurso já exista.");

            }catch(err: any){
                HandleCrud(err);
                return false;
            }
        });
    }
}