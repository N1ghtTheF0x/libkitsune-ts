import { ByteOrder, double, float, sint16, sint32, sint64, sint8, uint16, uint32, uint64, uint8 } from "../types"
import { StringEncoding } from "./string/encoding"
import { IStringReader } from "./string/reader"
import { IStringWriter } from "./string/writer"

export interface IOffsetStream
{
    offset: number
}

export interface IByteOrderStream
{
    byteOrder: ByteOrder
}

export interface IInputStream extends IOffsetStream, IByteOrderStream
{
    readInt8(): sint8
    readInt16(): sint16
    readInt32(): sint32
    readInt64(): sint64
    readUInt8(): uint8
    readUInt16(): uint16
    readUInt32(): uint32
    readUInt64(): uint64
    readFloat(): float
    readDouble(): double
    readString(reader: IStringReader): string
    readString(encoding: StringEncoding): string
    readArrayBuffer(length: number): ArrayBuffer
    readDataView(length: number): DataView
}

export interface IOutputStream extends IOffsetStream, IByteOrderStream
{
    writeInt8(value: sint8): this
    writeInt16(value: sint16): this
    writeInt32(value: sint32): this
    writeInt64(value: sint64): this
    writeUInt8(value: uint8): this
    writeUInt16(value: uint16): this
    writeUInt32(value: uint32): this
    writeUInt64(value: uint64): this
    writeFloat(value: float): this
    writeDouble(value: double): this
    writeString(string: string): this
    writeString(string: string,encoding: StringEncoding): this
    writeString(string: string,writer: IStringWriter): this
    writeArrayBuffer(buffer: ArrayBufferLike): this
    writeDataView(view: DataView): this
    
}

export interface IInputOutputStream extends IInputStream, IOutputStream
{

}