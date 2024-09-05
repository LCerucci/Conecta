import { CourseResult } from "../Interfaces/Course/CourseGet"; 

export class Course {
        private id?: number;
        private name: string;
        private description: string;
        private field: string;
        private degree: string;
        private tuitionFee: string;
        private idInst?: number;

    constructor(name: string, field: string, description: string, degree: string, tuitionFee: string, idInst?: number, id?: number) {
        this.id = id;
        this.idInst = idInst;
        this.name = this.sanitizeName(name) || "";
        this.description = this.sanitizeDescription(description);
        this.field = this.sanitizeField(field) || "";
        this.degree = this.sanitizeDegree(degree) || "";
        this.tuitionFee = this.sanitizeFee(tuitionFee) || "";
    }

    getId(): number | undefined{
        return this.id;
    }

    getidInstitution(): number | undefined{
        return this.idInst;
    }

    getName(): string{
        return this.name;
    }

    setName(newName: string): void{
        this.name = newName;
    }

    getDescription(): string{
        return this.description;
    }

    setDescription(newDescription: string): void {
        this.description = newDescription;
    }

    getField(): string {
        return this.field;
    }

    setField(field: string): void {
        this.field = field;
    }

    getDegree(): string{
        return this.degree;
    }

    setDegree(degree: string): void {
        this.degree = degree;
    }

    getTuitionFee(): string {
        return this.tuitionFee;
    }

    setTuitionFee(tuitionFee: string): void {
        this.tuitionFee = tuitionFee;
    }

    sanitizeName(name: string): string | void{
        const regex: RegExp = /^([A-Z][a-z]*)(\s[A-Z][a-z]*){0,10}$/
        if(regex.test(name))
            return name;
        else 
            throw new Error("invalid, field");
    }

    sanitizeFee(fee: string): string | void{
        if(fee === 'gratuito' || fee === 'pago')
            return fee
        else 
            throw new Error("Invalid field");
    }

    sanitizeDescription(description: string): string {
        return description.replace(/<\/?[^>]+(>|$)/g, "");
    }

    sanitizeField(field: string): string | void{
        const regex: RegExp = /^[A-Za-z0-9_]{1,30}$/;
        if(regex.test(field))
            return field;
        else
            throw new Error("invalid field");
    }

    sanitizeDegree(degree: string): string | void{
        if(degree === 'livre')
            return degree;
        else if(degree === 'tecnico')
            return degree
        else if(degree === 'graduação')
            return degree;
        else 
            throw new Error("Field's don't match");
    }

    CourseJSON(): CourseResult{
        return {
            id: this.id,
            idInst: this.idInst,
            name: this.name, 
            description: this.description,
            field: this.field,
            degree: this.degree,
            tuitionFee: this.tuitionFee
        };
    }
}