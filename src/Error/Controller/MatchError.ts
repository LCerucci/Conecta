export class MatchError extends Error{
    statusCode: number = 400; 
    details: string;

    constructor(message: string, details: string){
        super(message);
        this.details = details;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}