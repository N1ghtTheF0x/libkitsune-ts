import { ConversionError } from "../javascript"

export interface IVector2
{
    x: number
    y: number
}

export type IVector2Array = [number,number]
export type IVector2String = `(${number},${number})`

export interface IVector2Base<V extends IVector2> extends IVector2
{
    add(x: number,y: number): V
    add(vector: IVector2): V
    subtract(x: number,y: number): V
    subtract(vector: IVector2): V
    offset(x: number,y: number): this
    offset(vector: IVector2): this
    length(): number
    normalize(): this
    multiply(x: number): this
    multiply(x: number,y: number): number
    multiply(vector: IVector2): number
    distance(x: number,y: number,sqrt?: boolean): number
    distance(vector: IVector2,sqrt?: boolean): number
    toJSON(): IVector2
    toArray(): IVector2Array
    toString(): IVector2String
}

export class Vector2 implements IVector2Base<Vector2>
{
    public static is(obj: any): obj is IVector2
    {
        return typeof obj == "object" && "x" in obj && "y" in obj
    }
    public static convert(arr: ReadonlyArray<number>): Vector2
    public static convert(obj: IVector2): Vector2
    public static convert(a: ReadonlyArray<number> | IVector2): Vector2
    {
        if(Array.isArray(a) && a.length >= 2)
            return new this(a[0],a[1])
        if(this.is(a))
            return new this(a.x,a.y)
        throw new ConversionError(a,"Vector2")
    }
    public constructor(public x: number = 0,public y: number = 0)
    {

    }
    public distance(x: number, y: number, sqrt?: boolean): number
    public distance(vector: IVector2, sqrt?: boolean): number
    public distance(x: IVector2 | number, y: number | boolean = true, z: boolean = true): number
    {
        if(typeof x == "number" && typeof y == "number")
        {
            const result = Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)
            return z ? Math.sqrt(result) : result
        }
        if(Vector2.is(x) && typeof y == "boolean")
        {
            const result = Math.pow(x.x - this.x, 2) + Math.pow(x.y - this.y, 2)
            return y ? Math.sqrt(result) : result
        }
        throw new Error()
    }
    public multiply(x: number): this
    public multiply(x: number, y: number): number
    public multiply(vector: IVector2): number
    public multiply(x: number | IVector2, y?: number): number | this
    {
        if(typeof x == "number")
        {
            if(typeof y == "number")
                return Math.sqrt(this.x*x+this.y*y)
            this.x *= x,this.y *= x
            return this
        }
        if(Vector2.is(x))
            return Math.sqrt(this.x*x.x+this.y*x.y)
        throw new Error()
    }
    public set(x: number,y: number)
    {
        this.x = x,this.y = y
        return this
    }
    public add(x: number, y: number): Vector2
    public add(vector: IVector2): Vector2
    public add(a: IVector2 | number, y?: number): Vector2
    {
        if(typeof a == "number" && typeof y == "number")
            return new Vector2(this.x + a,this.y + y)
        if(Vector2.is(a))
            return new Vector2(this.x + a.x,this.y + a.y)
        throw new Error()
    }
    public subtract(x: number, y: number): Vector2
    public subtract(vector: IVector2): Vector2
    public subtract(a: IVector2 | number, y?: number): Vector2
    {
        if(typeof a == "number" && typeof y == "number")
            return new Vector2(this.x - a,this.y - y)
        if(Vector2.is(a))
            return new Vector2(this.x - a.x,this.y - a.y)
        throw new Error()
    }
    public offset(x: number, y: number): this
    public offset(vector: IVector2): this
    public offset(a: IVector2 | number, y?: number): this
    {
        if(typeof a == "number" && typeof y == "number")
        {
            this.x += a,this.y += y
            return this
        }
        if(Vector2.is(a))
        {
            this.x += a.x,this.y += a.y
            return this
        }
        throw new Error()
    }
    public length(): number
    {
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }
    public normalize(): this
    {
        const w = this.length()
        if(w != 0)
            this.x /= w,this.y /= w
        return this
    }
    public toJSON(): IVector2
    {
        return {
            x: this.x,
            y: this.y
        }    
    }
    public toArray(): IVector2Array
    {
        return [this.x,this.y]    
    }
    public toString(): IVector2String
    {
        return `(${this.x},${this.y})`    
    }
}

export interface IVector3 extends IVector2
{
    z: number
}

export interface IVector3Base<V extends IVector3> extends IVector3
{
    add(x: number,y: number,z: number): V
    add(vector: IVector3): V
    subtract(x: number,y: number,z: number): V
    subtract(vector: IVector3): V
    offset(x: number,y: number,z: number): this
    offset(vector: IVector3): this
    length(): number
    normalize(): this
    multiply(x: number): this
    multiply(x: number,y: number,z: number): number
    multiply(vector: IVector3): number
    cross(x: number,y: number,z: number): Vector3
    cross(vector: IVector3): Vector3
    distance(x: number,y: number,z: number,sqrt?: boolean): number
    distance(vector: IVector3,sqrt?: boolean): number
    toJSON(): IVector3
    toArray(): IVector3Array
    toString(): IVector3String
}

export type IVector3Array = [...IVector2Array,number]
export type IVector3String = `(${number},${number},${number})`

export class Vector3 implements IVector3Base<Vector3>
{
    public static is(obj: any): obj is IVector3
    {
        return Vector2.is(obj) && "z" in obj
    }
    public static convert(arr: ReadonlyArray<number>): Vector3
    public static convert(obj: IVector3): Vector3
    public static convert(a: ReadonlyArray<number> | IVector3): Vector3
    {
        if(Array.isArray(a) && a.length >= 3)
            return new this(a[0],a[1],a[2])
        if(this.is(a))
            return new this(a.x,a.y,a.z)
        throw new ConversionError(a,"Vector3")
    }
    public constructor(public x: number = 0,public y: number = 0,public z: number = 0)
    {

    }
    cross(x: number, y: number, z: number): Vector3
    cross(vector: IVector3): Vector3
    cross(x: IVector3 | number, y?: number, z?: number): Vector3
    {
        if(typeof x == "number" && typeof y == "number" && typeof z == "number")
            return new Vector3(this.y*z - this.z*y,this.z*x - this.x*z,this.x*y - this.y*x)
        if(Vector3.is(x))
            return new Vector3(this.y*x.z - this.z*x.y,this.z*x.x - this.x*x.z,this.x*x.y - this.y*x.x)
        throw new Error()
    }
    add(x: number, y: number, z: number): Vector3
    add(vector: IVector3): Vector3
    add(x: IVector3 | number, y?: number, z?: number): Vector3
    {
        if(typeof x == "number" && typeof y == "number" && typeof z == "number")
            return new Vector3(this.x + x,this.y + y,this.z + this.z)
        if(Vector3.is(x))
            return new Vector3(this.x + x.x,this.y + x.y,this.z + x.z)
        throw new Error()
    }
    subtract(x: number, y: number, z: number): Vector3
    subtract(vector: IVector3): Vector3
    subtract(x: IVector3 | number, y?: number, z?: number): Vector3
    {
        if(typeof x == "number" && typeof y == "number" && typeof z == "number")
            return new Vector3(this.x - x,this.y - y,this.z - this.z)
        if(Vector3.is(x))
            return new Vector3(this.x - x.x,this.y - x.y,this.z - x.z)
        throw new Error()
    }
    offset(x: number, y: number, z: number): this
    offset(vector: IVector3): this
    offset(x: IVector3 | number, y?: number, z?: number): this
    {
        if(typeof x == "number" && typeof y == "number" && typeof z == "number")
        {
            this.x += x,this.y += y,this.z += z
            return this
        }
        if(Vector3.is(x))
        {
            this.x += x.x,this.y += x.y,this.z += x.z
            return this
        }
        throw new Error()
    }
    length(): number
    {
        return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)
    }
    normalize(): this
    {
        const w = this.length()
        if(w != 0)
            this.x /= w,this.y /= w,this.z /= w
        return this
    }
    multiply(x: number): this
    multiply(x: number, y: number, z: number): number
    multiply(vector: IVector3): number
    multiply(x: IVector3 | number, y?: number, z?: number): number | this
    {
        if(typeof x == "number")
        {
            if(typeof y == "number" && typeof z == "number")
                return Math.sqrt(this.x*x+this.y*y+this.z*z)
            this.x *= x,this.y *= x,this.z *= x
            return this
        }
        if(Vector3.is(x))
            return Math.sqrt(this.x*x.x+this.y*x.y+this.z*x.z)
        throw new Error()
    }
    distance(x: number, y: number, z: number, sqrt?: boolean | undefined): number
    distance(vector: IVector3, sqrt?: boolean | undefined): number
    distance(x: IVector3 | number, y: number | boolean = true, z?: number, sqrt: boolean = true): number
    {
        if(typeof x == "number" && typeof y == "number" && typeof z == "number")
        {
            const result = Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) + Math.pow(z - this.z,2)
            return z ? Math.sqrt(result) : result
        }
        if(Vector3.is(x) && typeof y == "boolean")
        {
            const result = Math.pow(x.x - this.x, 2) + Math.pow(x.y - this.y, 2) + Math.pow(x.z - this.z,2)
            return y ? Math.sqrt(result) : result
        }
        throw new Error()
    }
    toJSON(): IVector3
    {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        }
    }
    toArray(): IVector3Array
    {
        return [this.x,this.y,this.z]
    }
    toString(): IVector3String
    {
        return `(${this.x},${this.y},${this.z})`
    }
}