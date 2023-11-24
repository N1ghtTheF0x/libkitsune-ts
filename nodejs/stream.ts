import { Readable } from "node:stream"
import { IDynamicStream, IInputStream } from "../source/stream/types"
import { ByteOrder, double, float, sint16, sint32, sint64, sint8, uint16, uint32, uint64, uint8 } from "../source/types/number"
import { StringEncoding } from "../source/stream/string/encoding"
import { IStringReader, string_readers } from "../source/stream/string/reader"

function read(stream: Readable,size: number)
{
    return stream.read(size) as Buffer | null
}

export class ReadableInputStream implements IInputStream, IDynamicStream
{
    public offset: number = 0
    public byteOrder: ByteOrder = "little"
    public get readable(){return this._stream.readable}
    public constructor(private readonly _stream: Readable)
    {

    }
    public readInt8(): sint8
    {
        const b = read(this._stream,1)
        if(!b)
            throw new Error("Readable is not readable")
        this.offset += 1
        return b.readInt8()
    }
    public readInt16(): sint16 
    {
        const b = read(this._stream,2)
        if(!b)
            throw new Error("Readable is not readable")
        this.offset += 2
        return this.byteOrder == "little" ? b.readInt16LE() : b.readInt16BE()
    }
    public readInt32(): sint32
    {
        const b = read(this._stream,4)
        if(!b)
            throw new Error("Readable is not readable")
        this.offset += 4
        return this.byteOrder == "little" ? b.readInt32LE() : b.readInt32BE()
    }
    public readInt64(): sint64
    {
        const b = read(this._stream,8)
        if(!b)
            throw new Error("Readable is not readable")
        this.offset += 8
        return this.byteOrder == "little" ? b.readBigInt64LE() : b.readBigInt64BE()
    }
    public readUInt8(): uint8
    {
        const b = read(this._stream,1)
        if(!b)
            throw new Error("Readable is not readable")
        this.offset += 1
        return b.readUInt8()
    }
    public readUInt16(): uint16 
    {
        const b = read(this._stream,2)
        if(!b)
            throw new Error("Readable is not readable")
        this.offset += 2
        return this.byteOrder == "little" ? b.readUInt16LE() : b.readUInt16BE()
    }
    public readUInt32(): uint32
    {
        const b = read(this._stream,4)
        if(!b)
            throw new Error("Readable is not readable")
        this.offset += 4
        return this.byteOrder == "little" ? b.readUInt32LE() : b.readUInt32BE()
    }
    public readUInt64(): uint64
    {
        const b = read(this._stream,8)
        if(!b)
            throw new Error("Readable is not readable")
        this.offset += 8
        return this.byteOrder == "little" ? b.readBigUInt64LE() : b.readBigUInt64BE()
    }
    public readFloat(): float
    {
        const b = read(this._stream,4)
        if(!b)
            throw new Error("Readable is not readable")
        this.offset += 4
        return this.byteOrder == "little" ? b.readFloatLE() : b.readFloatBE()
    }
    public readDouble(): double
    {
        const b = read(this._stream,8)
        if(!b)
            throw new Error("Readable is not readable")
        this.offset += 8
        return this.byteOrder == "little" ? b.readDoubleLE() : b.readDoubleBE()
    }
    public readString(length: number): string
    public readString(length: number, encoding: StringEncoding): string
    public readString(length: number, reader: IStringReader): string
    public readString(length: number, a: StringEncoding | IStringReader = "utf-8"): string
    {
        const reader = typeof a == "string" ? string_readers.get(a) : a
        if(!reader)
            throw new Error(`Unknown encoding: "${a}"`)
        return reader(this,length)
    }
    public readArrayBuffer(length: number): ArrayBuffer
    {
        const b: Buffer | null = this._stream.read(length)
        this.offset += length
        if(!b)
            throw new Error()
        return b.buffer.slice(b.byteOffset,b.byteOffset + b.byteLength)
    }
    public readDataView(length: number, byteOffset?: number , byteLength?: number ): DataView
    {
        return new DataView(this.readArrayBuffer(length),byteOffset,byteLength)
    }
    public *[Symbol.iterator](): Generator<uint8>
    {
        for(var chunk: Buffer | null = null;chunk != null;chunk = this._stream.read(1))
        {
            if(!chunk)
                break
            yield chunk.readUInt8()
        }
    }
    public get [Symbol.toStringTag](): "InputStream"
    {
        return "InputStream"
    }
}