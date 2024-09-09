import { InvalidField } from "../Error/Model/RegexError";

export class Admin {
 
    private id: number;
    private userName: string;
    private name: string;
    private password: string;
    private role: number;

    constructor(id: number, userName: string, name: string, password: string, role: number) {
        this.id = id;
        this.userName = this.sanitazeUserName(userName) || "";
        this.name = this.sanitizeName(name) || "";
        this.password = this.sanitizePassword(password) || "";
        this.role = this.sanitizeRole(role) || 0;
    }

    getId(): number {
        return this.id;
    }

    getUserName(): string{
        return this.userName;
    }

    setUserName(newUserName: string): void {
        this.userName = newUserName;
    }

    getName(): string{
        return this.name;
    }

    setName(newName: string): void {
        this.name = newName;
    }

    getPassword(): string{
        return this.password;
    }

    setPassword(newPassword: string): void {
        this.password = newPassword;
    }

    getRole(): number{
        return this.role;
    }

    setRole(newRole: number): void {
        this.role = newRole;
    }

    sanitazeUserName(userName: string): string | void{
        const regex: RegExp = /^[a-zA-Z0-9]{1,15}$/;

        if(regex.test(userName))
            return userName;
        else
            throw new InvalidField("O campo nome não atende aos padrões.", "Corrija o nome de usuário na entrada.");
    }

    sanitizeName(name: string): string | void{
        const regex: RegExp = /^[a-z]{1,45}$/;

        if(regex.test(name))
            return name;
        else
            throw new InvalidField("O campo nome não atende aos padrões.", "Corrija o nome de entrada.");
    }

    sanitizePassword(password: string): string | void{
        const inputRegex: RegExp = /^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{6,16}$/;
        const outputRegex: RegExp = /^\$2[aby]?\$10\$[./A-Za-z0-9]{22}\$[./A-Za-z0-9]{31}$/;

        if(inputRegex.test(password))
            return password;
        else if(outputRegex.test(password))
            return password
        else
            throw new InvalidField("Credenciais incorretas.", "Verifique as credencias e tente novamente.");
    }

    sanitizeRole(role: number): number | void{
        if(typeof role === 'number' && role >= 0 && role <= 2)
            return role;
        else
            throw new TypeError("Tipo da permissão inválido, esperado 'number'");
    }

    adminJson(): Object {
        return {
            id: this.id,
            username: this.userName,
            password: this.password,
            role: this.role
        };
    }
}