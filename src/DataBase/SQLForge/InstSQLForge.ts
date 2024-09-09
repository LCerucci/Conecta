export function getForgeParam(param: string): string{
    const regex: RegExp = /^[a-zA-Z0-9_]+$/
    if(!regex.test(param))
        throw new Error("Parametro REJEITADO!");

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
        throw new Error("Parametro REJEITADO!");

    return `UPDATE 
            Insttuition 
            SET ${param}=? 
            WHERE idInstitution=?`;
}

export const SQLALL: string = "SELECT * FROM Institution";
export const SQLCREATE: string = `INSERT INTO 
                                  Institution(name, educationLevel, contact, email, address, link) 
                                  VALUES(?,?,?,?,?,?)`;
export const SQLDELETE: string = `DELETE FROM Institution WHERE idInstitution=?`;