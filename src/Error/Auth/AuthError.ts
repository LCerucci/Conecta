export class AuthError extends Error{
    details: string;

    constructor(message: string, details: string){
        super(message);
        this.details = details;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class GenHashPassword extends Error{
    details: string;

    constructor(message: string, details: string){
        super(message);
        this.details = details;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class MatchPassword extends Error{
    details: string;

    constructor(message: string, details: string){
        super(message),
        this.details = details;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}