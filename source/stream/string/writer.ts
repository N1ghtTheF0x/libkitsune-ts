import { StringEncoding } from "./encoding"

export type IStringWriter = (string: string) => ArrayBuffer

function utf8_writer(string: string): ArrayBuffer
{
    return new TextEncoder().encode(string).buffer
}

function ascii_writer(string: string): ArrayBuffer
{
    return new TextEncoder().encode(string).buffer
}

export const string_writers: ReadonlyMap<StringEncoding,IStringWriter> = new Map([
    ["utf-8",utf8_writer],
    ["ascii",ascii_writer]
])