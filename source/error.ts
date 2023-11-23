export abstract class CustomError extends Error
{
    public constructor(name: string,message?: string,options?: ErrorOptions)
    {
        super(message,options)
        this.name = name
    }
}