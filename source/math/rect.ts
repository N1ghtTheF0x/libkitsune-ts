import { BoundingBox } from "./bbox"
import { ISize } from "./size"
import { IVector2 } from "./vector"

export type IRectangle = IVector2 & ISize

export class Rectangle implements IRectangle
{
    public constructor(public x: number,public y: number,public width: number,public height: number)
    {

    }
    public getBoundingBox()
    {
        return new BoundingBox(this.x,this.x + this.width,this.y,this.y + this.height)
    }
}