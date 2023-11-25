export interface IBoundingBox
{
    left: number
    right: number
    top: number
    bottom: number
}

export class BoundingBox implements IBoundingBox
{
    public constructor(public left: number,public right: number,public top: number,public bottom: number)
    {
        
    }
}