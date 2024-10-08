import { RowDataPacket } from "mysql2";
import {  Institution } from "../../Model/Institution";
import { ReadError } from "../../Error/CRUDerror/CRUDError";
import { InstitutionRead } from "../../DataBase/Institution/Read";
import { InstitutionDataResult } from "../../Interfaces/Institution/InstitutionRead";

const Get: InstitutionRead = new InstitutionRead();

export class InstitutionGetService{
    constructor(){
    }

    async getInstitutionById(id: number): Promise<InstitutionDataResult | null>{
        try{
            if(!id)
                throw new ReadError("Falha ao encontrar curso.", "Parâmetro não frnecido.");

            const result: RowDataPacket | null = await Get.readInstitutionById(id);

            if(result !== null){
                const institution: Institution = new Institution(
                    result.id, 
                    result.name, 
                    result.educationLevel, 
                    result.contact, 
                    result.email, 
                    result.address, 
                    result.link, 
                    result.description);
            
                return institution.institutionJSON();
            }
            else 
                return null;

        }catch(err){
            console.log(err);
            return null;
        }
    }

    async getInstitutionByParam(item: string, param: string): Promise<InstitutionDataResult[] | null>{
        try{
            let result: RowDataPacket[] | null;

            if(!param)
                result = await Get.readInstitutionAll();
            else
                result = await Get.readInstitutionByParam(param, item);

            if(result !== null){
                const info: Institution[] = result?.map((element) => {

                    return new Institution(
                        element.id,
                        element.name,
                        element.educationLevel,
                        element.contact,
                        element.email,
                        element.address,
                        element.link,
                        element.description
                    );
                });

                const institutions: InstitutionDataResult[] = info.map(element => element.institutionJSON());

                return institutions;
            }
            else
                return null;
            
        }catch(err){
            console.log(err);
            return null;
        }
    }
}