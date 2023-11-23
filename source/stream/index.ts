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

export interface IFixedStream
{
    readonly length: number
}

export interface IDynamicStream
{
    readonly readable: boolean
}

export interface IInputStreamBase
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
    readString(length: number): string
    readString(length: number,encoding: StringEncoding): string
    readString(length: number,reader: IStringReader): string
    readArrayBuffer(length: number): ArrayBuffer
    readDataView(length: number,byteOffset?: number , byteLength?: number): DataView
    [Symbol.iterator](): Generator<uint8>
}

export interface IInputStream extends IInputStreamBase, IOffsetStream, IByteOrderStream
{
    get [Symbol.toStringTag](): "InputStream"
}

export interface IOutputStreamBase
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

export interface IOutputStream extends IOutputStreamBase, IOffsetStream, IByteOrderStream
{
    get [Symbol.toStringTag](): "OutputStream"
}

export interface IInputOutputStream extends IInputStreamBase, IOutputStreamBase, IByteOrderStream
{
    readOffset: number
    writeOffset: number
    get [Symbol.toStringTag](): "InputOutputStream"
}

export type InputStreamLike = IInputStream | IInputOutputStream
export type OutputStreamLike = IOutputStream | IInputOutputStream