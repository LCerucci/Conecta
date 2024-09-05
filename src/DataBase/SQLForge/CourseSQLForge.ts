import { UpdateCourse } from "../../Interfaces/Course/CourseUpdate";

export const SQLALL: string = "SELECT * FROM Courses";

export function getForgeParam(param: string): string{
    const regex: RegExp = /^[a-zA-Z0-9_]+$/
    if(!regex.test(param))
        throw new Error("Eu sei oq você está tentando seu sasfado.");

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
        throw new Error("Eu sei oq você está tentando seu sasfado.");

    return `UPDATE 
            Course 
            SET ${param}=? 
            WHERE idCourse=?`;
}