export abstract class CustomError extends Error
{
    public constructor(name: string,message?: string,options?: ErrorOptions)
    {
        super(message,options)
        this.name = name
    }
}

export class ConversionError extends CustomError
{
    public constructor(public value: any,public target: string,options?: ErrorOptions)
    {
        super("ConversionError",`Can't convert ${value} to ${target}`,options)
    }
}