const limit = <N>(value: N,min: N,max: N) => {
    if(value < min) return min
    if(value > max) return max
    return value
}

export type sint8 = Int8Array[0]
export const SINT8_MIN = -0x7f
export const SINT8_MAX = 0x80
export const sint8 = (value: sint8) => limit(value,SINT8_MIN,SINT8_MAX)
export type sint16 = Int16Array[0]
export const SINT16_MIN = -0x7fff
export const SINT16_MAX = 0x8000
export const sint16 = (value: sint16) => limit(value,SINT16_MIN,SINT16_MAX)
export type sint32 = Int32Array[0]
export const SINT32_MIN = -0x7fff_ffff
export const SINT32_MAX = 0x8000_0000
export const sint32 = (value: sint32) => limit(value,SINT32_MIN,SINT32_MAX)
export type sint64 = BigInt64Array[0]
export const SINT64_MIN = -0x7fff_ffff_ffff_ffffn
export const SINT64_MAX = 0x8000_0000_0000_0000n
export const sint64 = (value: sint64) => limit(value,SINT64_MIN,SINT64_MAX)

export type uint8 = Uint8Array[0]
export const UINT8_MAX = 0xff
export const uint8 = (value: uint8) => limit(value,0,UINT8_MAX)
export type uint16 = Uint16Array[0]
export const UINT16_MAX = 0xffff
export const uint16 = (value: uint16) => limit(value,0,UINT16_MAX)
export type uint32 = Uint32Array[0]
export const UINT32_MAX = 0xffff_ffff
export const uint32 = (value: uint32) => limit(value,0,UINT32_MAX)
export type uint64 = BigUint64Array[0]
export const UINT64_MAX = 0xffff_ffff_ffff_ffffn
export const uint64 = (value: uint64) => limit(value,0n,UINT64_MAX)

export type float = Float32Array[0]
export const FLOAT_MIN = 1.175494351E-38
export const FLOAT_MAX = 3.402823466E+38
export const float = (value: float) => limit(value,FLOAT_MIN,FLOAT_MAX)
export type double = Float64Array[0]
export const DOUBLE_MIN = 2.2250738585072014E-308
export const DOUBLE_MAX = 1.7976931348623158E+308
export const double = (value: double) => limit(value,DOUBLE_MIN,DOUBLE_MAX)

export type ByteOrder = "big" | "little"

export type SignedIntegerTable = {
    "sint8": sint8
    "sint16": sint16
    "sint32": sint32
    "sint64": sint64
}

export type UnsignedIntegerTable = {
    "uint8": uint8
    "uint16": uint16
    "uint32": uint32
    "uint64": uint64
}

export type FloatTable = {
    "float": float
    "double": double
}

export type IntegerTable = SignedIntegerTable & UnsignedIntegerTable
export type NumberTable = IntegerTable & FloatTable