import { InputStreamLike } from "../types"
import { StringEncoding } from "./encoding"

export type IStringReader = (stream: InputStreamLike,length: number) => string

function utf8_reader(stream: InputStreamLike,length: number): string
{
    const buffer = stream.readArrayBuffer(length)
    return new TextDecoder().decode(buffer)
}

function ascii_reader(stream: InputStreamLike,length: number): string
{
    return String.fromCharCode(...[...stream])
}

export const string_readers: ReadonlyMap<StringEncoding,IStringReader> = new Map([
    ["utf-8",utf8_reader],
    ["ascii",ascii_reader]
])