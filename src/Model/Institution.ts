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
            throw new Error("jbdbfd");
        else 
            return name;
    }

    sanitazeEducationLevel(degree: string): string | void{
        if(degree === 'livre')
            return degree;
        else if(degree === 'tecnico')
            return degree
        else if(degree === 'graduação')
            return degree;
        else 
            throw new Error("Field's don't match");
    }

    sanitizeContact(contact: string): string{
        const regex: RegExp = /^\d+$/;
        if(contact.length > 11 || contact.length < 10)
            if(regex.test(contact))
                return contact
            else
                throw new Error("adsjdbs");
        else
            throw new Error("adsjdbs");
    }

    sanitizeEmail(email: string): string {
        let sanitizedEmail = email.trim();
        sanitizedEmail = sanitizedEmail.toLowerCase();
    
        return sanitizedEmail;
    }

    sanitizeDescription(description: string): string {
        return description.replace(/<\/?[^>]+(>|$)/g, "");
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