import { CreateError, UpdateError, ReadError, DeleteError } from "../CRUDerror/CRUDError";

export function HandleCrud(err: any): void{
    if( 
        err instanceof CreateError ||
        err instanceof ReadError   ||
        err instanceof UpdateError ||
        err instanceof DeleteError
     )
    {
        console.error(`Error: ${err.name}, details: ${err.details}, stack: ${err.stack}`);
        return;
    }
    else 
    {
        console.log("Unknow Error.");
        console.error(`Error: ${err.name}, stack: ${err.stack}`);
        return;
    }
}