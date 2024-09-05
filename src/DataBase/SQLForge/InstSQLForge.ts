export const SQLALL: string = "SELECT * FROM Institution";

export function getForgeParam(param: string): string{
    const regex: RegExp = /^[a-zA-Z0-9_]+$/
    if(!regex.test(param))
        throw new Error("Eu sei oq você está tentando seu sasfado.");

    return `SELECT 
            idInstitution, 
            name, 
            educationLevel, 
            contact, 
            email, 
            address, 
            link FROM 
            Institution 
            WHERE ${param}=?`;
}

export function getForgeId(id: number): string{
    const param: string = id.toString();

    return `SELECT 
            idInstitution, 
            name, 
            educationLevel, 
            contact, 
            email, 
            address, 
            link 
            FROM Institution 
            WHERE ${param}=?`;
}

export function updateForgeParam(param: string): string{
    const regex: RegExp = /^[a-zA-Z0-9_]+$/
    if(!regex.test(param))
        throw new Error("Eu sei oq você está tentando seu sasfado.");

    return `UPDATE 
            Insttuition 
            SET ${param}=? 
            WHERE idInstitution=?`;
}