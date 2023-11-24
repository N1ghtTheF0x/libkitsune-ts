import { CustomError } from "../source/javascript/error"

export class AlertError extends CustomError
{
    public constructor(message?: string,options?: ErrorOptions)
    {
        super("AlertError",message,options)
        alert(this)
    }
}