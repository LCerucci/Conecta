export class CreateError extends Error{
    details: string;

    constructor(message: string, details: string){
        super(message);
        this.name = this.constructor.name;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ReadError extends Error{
    details: string;

    constructor(message: string, details: string){
        super(message);
        this.name = this.constructor.name;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class UpdateError extends Error{
    details: string;

    constructor(message: string, details: string){
        super(message);
        this.name = this.constructor.name;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class DeleteError extends Error{
    details: string;

    constructor(message: string, details: string){
        super(message);
        this.name = this.constructor.name;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}