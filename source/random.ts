import { double, float, sint32, sint64 } from "./types"

export interface IRandom
{
    seed: number
    next(bits: number): number
    nextInt(): sint32
    nextInt(bound: number): sint32
    nextLong(): sint64
    nextBoolean(): boolean
    nextFloat(): float
    nextDouble(): double
    nextGaussian(): double
}

export class Random implements IRandom
{
    private _haveNextNextGaussian = false
    private _nextNextGaussian = 0
    public get seed(){return this._seed}
    public set seed(val){this._seed = (val ^ 0x5DEECE66D) & ((1 << 48) - 1);this._haveNextNextGaussian = false}
    public constructor()
    public constructor(seed: number)
    public constructor(private _seed: number = Date.now())
    {
        this.seed = _seed
    }
    public next(bits: number): number
    {
        this._seed = (this._seed * 0x5DEECE66D + 0xB) & ((1 << 48) - 1)
        return this._seed >>> (48 - bits)
    }
    public nextInt(): sint32
    public nextInt(bound: number): sint32
    public nextInt(bound?: number): sint32
    {
        if(!bound) return this.next(32)

        if(bound <= 0)
            throw new Error("bound must be positive")
        if((bound & -bound) == bound)
            return (bound * this.next(31)) >> 31
        var bits,val
        do {
            bits = this.next(31)
            val = bits & bound
        } while(bits - val + (bound - 1) < 0)
        return val
    }
    public nextLong(): sint64
    {
        return (BigInt(this.next(32)) << 32n) + BigInt(this.next(32))
    }
    public nextBoolean(): boolean
    {
        return this.next(1) != 0
    }
    public nextFloat(): float
    {
        return this.next(24) / (1 << 24)
    }
    public nextDouble(): double
    {
        return Number((BigInt(this.next(26)) << 27n) + BigInt(this.next(27))) / Number(1n << 53n)
    }
    public nextGaussian(): double
    {
        if(this._haveNextNextGaussian)
        {
            this._haveNextNextGaussian = false
            return this._nextNextGaussian
        }
        var v1,v2,s
        do {
            v1 = 2 * this.nextDouble() - 1
            v2 = 2 * this.nextDouble() - 1
            s = v1 * v1 + v2 * v2
        } while(s >= 1 || s == 0)
        var m = Math.sqrt(-2 * Math.log(s)/s)
        this._nextNextGaussian = v2 * m
        this._haveNextNextGaussian = true
        return v1 * m
    }
}