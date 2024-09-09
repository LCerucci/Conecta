import { conn } from "../Connection";
import { RowDataPacket, FieldPacket } from 'mysql2';
import { ReadError } from "../../Error/CRUDerror/CRUDError";
import { getForgeParam, getForgeId, SQLALL } from "../SQLForge/InstSQLForge";


export class InstitutionRead {
    constructor() {
    }

    async readInstitutionById(id: number): Promise<RowDataPacket | null> {
        try {

            if(!id)
                throw new ReadError("Falha ao encontrar curso.", "Talvez o parâmetro não tenha sido fornecido.");

            await conn.beginTransaction();

            const SQL: string = getForgeId(id);

            const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(SQL, [id]);

            if (result.length > 0) {
                await conn.commit();
                return result[0];
            }
            else
                throw new ReadError("Falha ao encontrar curso.", "Talvez o curso não exista.");

        } catch (err) {
            console.log(err);
            await conn.rollback();
            return null;
        }
    }

    async readInstitutionByParam(param: string): Promise<RowDataPacket[] | null> {
        try {
            await conn.beginTransaction();

            const SQL: string = getForgeParam(param);

            const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(SQL, [param]);

            if (result.length > 0) {
                await conn.commit();
                return result;
            }
            else
            throw new ReadError("Falha ao encontrar curso.", "Talvez o curso não exista.");

        } catch (err) {
            await conn.rollback();
            console.log(err);
            return null;
        }
    }

    async readInstitutionAll(): Promise<RowDataPacket[] | null> {
        try {
            await conn.beginTransaction();

            const [result, _metaData]: [RowDataPacket[], FieldPacket[]] = await conn.execute(SQLALL);

            if (result.length > 0) {
                await conn.commit();
                return result;
            }
            else
            throw new ReadError("Falha ao encontrar curso.", "Talvez o curso não exista.");

        } catch (err) {
            await conn.rollback();
            console.log(err);
            return null;
        }
    }
}