import { InvalidField } from "../Model/RegexError";
import { TypeError } from "../Model/TypeError";

export function HandleModel(err: Error): void{
    if(err instanceof InvalidField || err instanceof TypeError){
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