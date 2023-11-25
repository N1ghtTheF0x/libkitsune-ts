import { IVector2, IVector3, Vector2, Vector3 } from "./vector"

export interface IMatrix
{
    raw: Array<number>
}

const identity3x3 = [
    1,0,0,
    0,1,0,
    0,0,1
]

const translation3x3 = (x: number,y: number) => [
    1,0,0,
    0,1,0,
    x,y,1
]

const rotation3x3 = (angle: number) => {
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return [
        c,-s,0,
        s,c,0,
        0,0,1
    ]
}

const scaling3x3 = (x: number,y: number) => [
    x,0,0,
    0,y,0,
    0,0,1
]

const projection3x3 = (width: number,height: number) => [
    2/width,0,0,
    0,2/height,0,
    -1,0,0
]

const multiply3x3 = (a: Array<number>,b: Array<number>) => {
    const a00 = a[0 * 3 + 0]
    const a01 = a[0 * 3 + 1]
    const a02 = a[0 * 3 + 2]
    const a10 = a[1 * 3 + 0]
    const a11 = a[1 * 3 + 1]
    const a12 = a[1 * 3 + 2]
    const a20 = a[2 * 3 + 0]
    const a21 = a[2 * 3 + 1]
    const a22 = a[2 * 3 + 2]
    const b00 = b[0 * 3 + 0]
    const b01 = b[0 * 3 + 1]
    const b02 = b[0 * 3 + 2]
    const b10 = b[1 * 3 + 0]
    const b11 = b[1 * 3 + 1]
    const b12 = b[1 * 3 + 2]
    const b20 = b[2 * 3 + 0]
    const b21 = b[2 * 3 + 1]
    const b22 = b[2 * 3 + 2]
 
    return [
        b00 * a00 + b01 * a10 + b02 * a20,
        b00 * a01 + b01 * a11 + b02 * a21,
        b00 * a02 + b01 * a12 + b02 * a22,
        b10 * a00 + b11 * a10 + b12 * a20,
        b10 * a01 + b11 * a11 + b12 * a21,
        b10 * a02 + b11 * a12 + b12 * a22,
        b20 * a00 + b21 * a10 + b22 * a20,
        b20 * a01 + b21 * a11 + b22 * a21,
        b20 * a02 + b21 * a12 + b22 * a22,
    ]
}

export class Matrix3x3 implements IMatrix
{
    public static Projection(width: number,height: number)
    {
        return new this(projection3x3(width,height))
    }
    public constructor(public raw = identity3x3)
    {

    }
    public multiply(matrix: Matrix3x3): this
    public multiply(raw: Array<number>): this
    public multiply(a: Matrix3x3 | Array<number>)
    {
        const raw = Array.isArray(a) ? a : a.raw
        this.raw = multiply3x3(this.raw,raw)
        return this
    }
    public translate(x: number,y: number): this
    public translate(vector: IVector2): this
    public translate(a: IVector2 | number,y?: number)
    {
        if(typeof a == "number" && typeof y == "number")
            this.raw = multiply3x3(this.raw,translation3x3(a,y))
        if(Vector2.is(a))
        this.raw = multiply3x3(this.raw,translation3x3(a.x,a.y))
        return this
    }
    public rotate(angle: number)
    {
        this.raw = multiply3x3(this.raw,rotation3x3(angle))
        return this
    }
    public scale(x: number): this
    public scale(x: number,y: number): this
    public scale(vector: IVector2): this
    public scale(x: IVector2 | number,y?: number): this
    {
        if(typeof x == "number")
            this.raw = typeof y == "number" ?
                        multiply3x3(this.raw,scaling3x3(x,y)) :
                        multiply3x3(this.raw,scaling3x3(x,x))
        if(Vector2.is(x))
            this.raw = multiply3x3(this.raw,scaling3x3(x.x,x.y))
        return this
    }
}

const identity4x4 = [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1
]

const translation4x4 = (x: number,y: number,z: number) => [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    x,y,z,1
]

const rotationX4x4 = (angle: number) => {
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return [
        1,0,0,0,
        0,c,s,0,
        0,-s,c,0,
        0,0,0,1
    ]
}

const rotationY4x4 = (angle: number) => {
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return [
        c,0,-s,0,
        0,1,0,0,
        s,0,c,0,
        0,0,0,1
    ]
}

const rotationZ4x4 = (angle: number) => {
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return [
        c,s,0,0,
        -s,c,0,0,
        0,0,1,0,
        0,0,0,1
    ]
}

const scaling4x4 = (x: number,y: number,z: number) => [
    x,0,0,0,
    0,y,0,0,
    0,0,z,0,
    0,0,0,1
]

const multiply4x4 = (a: Array<number>,b: Array<number>) => {
    const b00 = b[0 * 4 + 0]
    const b01 = b[0 * 4 + 1]
    const b02 = b[0 * 4 + 2]
    const b03 = b[0 * 4 + 3]
    const b10 = b[1 * 4 + 0]
    const b11 = b[1 * 4 + 1]
    const b12 = b[1 * 4 + 2]
    const b13 = b[1 * 4 + 3]
    const b20 = b[2 * 4 + 0]
    const b21 = b[2 * 4 + 1]
    const b22 = b[2 * 4 + 2]
    const b23 = b[2 * 4 + 3]
    const b30 = b[3 * 4 + 0]
    const b31 = b[3 * 4 + 1]
    const b32 = b[3 * 4 + 2]
    const b33 = b[3 * 4 + 3]
    const a00 = a[0 * 4 + 0]
    const a01 = a[0 * 4 + 1]
    const a02 = a[0 * 4 + 2]
    const a03 = a[0 * 4 + 3]
    const a10 = a[1 * 4 + 0]
    const a11 = a[1 * 4 + 1]
    const a12 = a[1 * 4 + 2]
    const a13 = a[1 * 4 + 3]
    const a20 = a[2 * 4 + 0]
    const a21 = a[2 * 4 + 1]
    const a22 = a[2 * 4 + 2]
    const a23 = a[2 * 4 + 3]
    const a30 = a[3 * 4 + 0]
    const a31 = a[3 * 4 + 1]
    const a32 = a[3 * 4 + 2]
    const a33 = a[3 * 4 + 3]
 
    return [
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
}

const projection4x4 = (width: number,height: number,depth: number) => [
    2/width,0,0,0,
    0,2/height,0,0,
    0,0,2/depth,0,
    -1,1,0,1
]

const ortho = (left: number,right: number,bottom: number,top: number,near: number,far: number) => [
    2/(right - left),0,0,0,
    0,2/(top - bottom),0,0,
    0,0,2/(near - far),0,
    (left + right)/(left - right),
    (bottom + top)/(bottom - top),
    (near + far)/(near + far),
    1
]

const persp = (fov: number,aspect: number,near: number,far: number) => {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fov)
    const inv = 1.0 / (near - far)

    return [
        f / aspect,0,0,0,
        0,f,0,0,
        0,0,(near + far) * inv,-1,
        0,0,near * far * inv * 2,0
    ]
}

export class Matrix4x4 implements IMatrix
{
    public static Projection(width: number,height: number,depth: number)
    {
        return new this(projection4x4(width,height,depth))
    }
    public static Orthographic(left: number,right: number,bottom: number,top: number,near: number,far: number)
    {
        return new this(ortho(left,right,bottom,top,near,far))
    }
    public static Perspective(fov: number,aspect: number,near: number,far: number)
    {
        return new this(persp(fov,aspect,near,far))
    }
    public constructor(public raw = identity4x4)
    {

    }
    public multiply(matix: Matrix4x4): this
    public multiply(raw: Array<number>): this
    public multiply(a: Matrix4x4 | Array<number>): this
    {
        const raw = Array.isArray(a) ? a : a.raw
        this.raw = multiply4x4(this.raw,raw)
        return this
    }
    public translation(x: number,y: number,z: number): this
    public translation(vector: IVector3): this
    public translation(a: IVector3 | number,y?: number,z?: number): this
    {
        if(typeof a == "number" && typeof y == "number" && typeof z == "number")
            this.raw = multiply4x4(this.raw,translation4x4(a,y,z))
        if(Vector3.is(a))
            this.raw = multiply4x4(this.raw,translation4x4(a.x,a.y,a.z))
        return this
    }
    public rotate(x: number,y: number,z: number): this
    public rotate(vector: IVector3): this
    public rotate(a: IVector3 | number,y?: number,z?: number): this
    {
        if(typeof a == "number" && typeof y == "number" && typeof z == "number")
            return this.rotateX(a).rotateY(y).rotateZ(z)
        if(Vector3.is(a))
            return this.rotateX(a.x).rotateY(a.y).rotateZ(a.z)
        return this
    }
    public rotateX(angle: number)
    {
        this.raw = multiply4x4(this.raw,rotationX4x4(angle))
        return this
    }
    public rotateY(angle: number)
    {
        this.raw = multiply4x4(this.raw,rotationY4x4(angle))
        return this
    }
    public rotateZ(angle: number)
    {
        this.raw = multiply4x4(this.raw,rotationZ4x4(angle))
        return this
    }
    public scale(x: number): this
    public scale(x: number,y: number,z: number): this
    public scale(vector: IVector3): this
    public scale(a: IVector3 | number,y?: number,z?: number): this
    {
        if(typeof a == "number")
            this.raw = typeof y == "number" && typeof z == "number" ?
                        multiply4x4(this.raw,scaling4x4(a,y,z)) :
                        multiply4x4(this.raw,scaling4x4(a,a,a))
        if(Vector3.is(a))
            this.raw = multiply4x4(this.raw,scaling4x4(a.x,a.y,a.z))
        return this
    }
}