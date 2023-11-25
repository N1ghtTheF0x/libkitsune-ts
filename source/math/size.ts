export interface ISize
{
    width: number
    height: number
}

export class Size implements ISize
{
    public constructor(public width: number,public height: number)
    {
        
    }
}