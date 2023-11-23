import { IFixedStream, IInputOutputStream } from "."
import { ByteOrder, double, float, sint16, sint32, sint64, sint8, uint16, uint32, uint64, uint8 } from "../types"
import { StringEncoding } from "./string/encoding"
import { IStringReader, string_readers } from "./string/reader"
import { IStringWriter, string_writers } from "./string/writer"

export class DataViewInputOutputStream implements IInputOutputStream, IFixedStream
{
    public readOffset: number = 0
    public writeOffset: number = 0
    public byteOrder: ByteOrder = "little"
    public get length(){return this._view.byteLength}
    public static fromBuffer(buffer: Buffer)
    {
        if(!Buffer)
            throw new ReferenceError("Buffer is not defined")
        if(!Buffer.isBuffer(buffer))
            throw new Error(`${buffer} is not a Buffer`)
        return this.create(buffer.buffer,buffer.byteOffset,buffer.byteLength)
    }
    public static create(...args: ConstructorParameters<DataViewConstructor>)
    {
        return new this(new DataView(...args))
    }
    public constructor(private readonly _view: DataView)
    {

    }
    public writeInt8(value: sint8): this
    {
        this._view.setInt8(this.writeOffset,value)
        this.writeOffset += 1
        return this
    }
    public writeInt16(value: sint16): this
    {
        this._view.setInt16(this.writeOffset,value,this.byteOrder == "little")
        this.writeOffset += 2
        return this
    }
    public writeInt32(value: sint32): this 
    {
        this._view.setInt32(this.writeOffset,value,this.byteOrder == "little")
        this.writeOffset += 4
        return this
    }
    public writeInt64(value: sint64): this
    {
        this._view.setBigInt64(this.writeOffset,value,this.byteOrder == "little")
        this.writeOffset += 8
        return this
    }
    public writeUInt8(value: uint8): this
    {
        this._view.setUint8(this.writeOffset,value)
        this.writeOffset += 1
        return this
    }
    public writeUInt16(value: uint16): this
    {
        this._view.setUint16(this.writeOffset,value,this.byteOrder == "little")
        this.writeOffset += 2
        return this
    }
    public writeUInt32(value: uint32): this
    {
        this._view.setUint32(this.writeOffset,value,this.byteOrder == "little")
        this.writeOffset += 4
        return this
    }
    public writeUInt64(value: uint64): this
    {
        this._view.setBigUint64(this.writeOffset,value,this.byteOrder == "little")
        this.writeOffset += 8
        return this
    }
    public writeFloat(value: float): this 
    {
        this._view.setFloat32(this.writeOffset,value,this.byteOrder == "little")
        this.writeOffset += 4
        return this
    }
    public writeDouble(value: double): this
    {
        this._view.setFloat64(this.writeOffset,value,this.byteOrder == "little")
        this.writeOffset += 8
        return this
    }
    public writeString(string: string): this
    public writeString(string: string, encoding: StringEncoding): this
    public writeString(string: string, writer: IStringWriter): this
    public writeString(string: string, a: StringEncoding | IStringWriter = "utf-8"): this
    {
        const writer = typeof a == "string" ? string_writers.get(a) : a
        if(!writer)
            throw new Error(`Unknown encoding: "${a}"`)
        return this.writeArrayBuffer(writer(string))
    }
    public writeArrayBuffer(buffer: ArrayBufferLike): this
    {
        new Uint8Array(this._view.buffer).set(new Uint8Array(buffer),this.writeOffset)
        return this
    }
    public writeDataView(view: DataView): this
    {
        return this.writeArrayBuffer(view.buffer)
    }
    public readInt8(): sint8
    {
        const value = this._view.getInt8(this.readOffset)
        this.readOffset += 1
        return value
    }
    public readInt16(): sint16
    {
        const value = this._view.getInt16(this.readOffset,this.byteOrder == "little")
        this.readOffset += 2
        return value
    }
    public readInt32(): sint32
    {
        const value = this._view.getInt32(this.readOffset,this.byteOrder == "little")
        this.readOffset += 4
        return value
    }
    public readInt64(): sint64
    {
        const value = this._view.getBigInt64(this.readOffset,this.byteOrder == "little")
        this.readOffset += 8
        return value
    }
    public readUInt8(): uint8
    {
        const value = this._view.getUint8(this.readOffset)
        this.readOffset += 1
        return value
    }
    public readUInt16(): uint16
    {
        const value = this._view.getUint16(this.readOffset,this.byteOrder == "little")
        this.readOffset += 2
        return value
    }
    public readUInt32(): uint32
    {
        const value = this._view.getUint32(this.readOffset,this.byteOrder == "little")
        this.readOffset += 4
        return value
    }
    public readUInt64(): uint64
    {
        const value = this._view.getBigUint64(this.readOffset,this.byteOrder == "little")
        this.readOffset += 8
        return value
    }
    public readFloat(): float
    {
        const value = this._view.getFloat32(this.readOffset,this.byteOrder == "little")
        this.readOffset += 4
        return value
    }
    public readDouble(): double
    {
        const value = this._view.getFloat64(this.readOffset,this.byteOrder == "little")
        this.readOffset += 8
        return value
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
        const buffer = this._view.buffer.slice(this.readOffset,this.readOffset + length)
        this.readOffset += length
        return buffer
    }
    public readDataView(length: number,byteOffset?: number,byteLength?: number): DataView
    {
        return new DataView(this.readArrayBuffer(length),byteOffset,byteLength)
    }
    public *[Symbol.iterator]()
    {
        for(var i = 0;i < this.length;i++)
            yield this.readUInt8()
    }
    public get [Symbol.toStringTag](): "InputOutputStream"
    {
        return "InputOutputStream"
    }
}