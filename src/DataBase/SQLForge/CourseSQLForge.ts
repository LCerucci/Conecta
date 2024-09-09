
export function getForgeParam(param: string): string{
    const regex: RegExp = /^[a-zA-Z0-9_]+$/
    if(!regex.test(param))
        throw new Error("Parametro REJEITADO!");

    return `SELECT idCourse, 
            idInstitution, 
            name, 
            field, 
            description, 
            degree, 
            tuitionFee 
            FROM 
            Course 
            WHERE ${param}=?`;
}

export function getForgeId(id: number): string{
    const param: string = id.toString();
    return `SELECT idCourse, 
            idInstitution, 
            name, 
            field, 
            description, 
            degree, 
            tuitionFee 
            FROM 
            Course 
            WHERE ${param}=?`;
}

export function updateForgeParam(param: string): string{
    const regex: RegExp = /^[a-zA-Z0-9_]+$/
    if(!regex.test(param))
        throw new Error("Parametro REJEITADO!");

    return `UPDATE 
            Course 
            SET ${param}=? 
            WHERE idCourse=?`;
}


export const SQLALL: string = "SELECT * FROM Courses";

export const SQLCREATE: string = `INSERT INTO 
                                  Course(idInstitution, name, field, description, degree, tuitionFee) 
                                  VALUES (?, ?, ?, ?, ?, ?)`; 
                                  
export const SQLDELETE: string = "DELETE FROM ConectaCourse WHERE idConectaCourse=?";