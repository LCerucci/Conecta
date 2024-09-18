import { InvalidField } from "../Error/Model/RegexError";
import { InstitutionDataResult } from "../Interfaces/Institution/InstitutionRead"; 

export class Institution{

    private id: number;
    private name: string;
    private educationLevel: string;
    private contact: string;
    private email: string;
    private address: string
    private link: string;
    private description: string;

    constructor(id: number, name: string, educationLevel: string, contact: string, email: string, address: string, link: string, description: string){
        this.id = id; 
        this.name = this.sanitizeName(name) || '';
        this.educationLevel = this.sanitazeEducationLevel(educationLevel) || "";
        this.contact = this.sanitizeContact(contact);
        this.email = this.sanitizeEmail(email);
        this.address = address;
        this.link = link;
        this.description = this.sanitizeDescription(description);
    }

    getId(): number{
        return this.id;
    }

    getName(): string{
        return this.name;
    }

    setName(newName: string): void{
        this.name = newName;
    }

    getEducationLevel(): string{
        return this.educationLevel;
    }

    setEducationLevel(educationLevel: string): void{
        this.educationLevel = educationLevel;
    }

    getContact(): string{
        return this.contact;
    }

    setContact(contact: string): void{
        this.contact = contact;
    }

    getEmail(): string{
        return this.email;
    }

    setEmail(email: string): void{
        this.email = email;
    }

    getAddress(): string{
        return this.address;
    }

    setAddress(address: string): void{
        this.address = address;
    }

    getLink(): string{
        return this.link;   
    }

    setLink(link: string): void{
        this.link = link;
    }

    getDescription(): string{
        return this.description;
    }

    setDescription(newDescription: string): void{
        this.description = newDescription;
    }

    sanitizeName(name: string): string | void{
        if(name.length > 45)
            throw new InvalidField("Nome da instituição fora dos padrões.", "O nome possui mais de 45 caracteres.");
        else 
            return name;
    }

    sanitazeEducationLevel(degree: string): string | void{
        if(degree === 'livre')
            return degree;
        else if(degree === 'tecnico')
            return degree
        else if(degree === 'graduaçao')
            return degree;
        else 
            throw new InvalidField("Nivel do curso inválido.", "Os padrões se restringem a 'livre', 'tecnico' ou 'graduaçao'.");
    }

    sanitizeContact(contact: string): string{
        if(/^[0-9]+$/.test(contact))
            if(contact.length <= 11 && contact.length >= 10)
                return contact
            else
                throw new InvalidField("Contato fora dos padrões.", "O contato deve conter apenas caracteres numericos.");
        else
            throw new InvalidField("Contato fora dos padrões.","O contato deve ter entre 10 e 11 caracteres especificamente.");
    }

    sanitizeEmail(email: string): string {
        let sanitizedEmail = email.trim();
        sanitizedEmail = sanitizedEmail.toLowerCase();
    
        return sanitizedEmail;
    }

    sanitizeDescription(description: string): string {
        console.log(typeof description);
        let sanitized: string = description.replace(/<\/?[^>]+(>|$)/g, "");
        return sanitized;
    }

    institutionJSON(): InstitutionDataResult{
        return {
            id: this.id, 
            name:  this.name,
            educationLevel: this.educationLevel,
            contact: this.contact,
            email: this.email,
            address: this.address,
            link: this.link,
            description: this.description,
        };
    }
}