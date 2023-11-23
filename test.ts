import { createLogger } from "./source/logger"
import { IInputOutputStream } from "./source/stream"
import { DataViewInputOutputStream } from "./source/stream/view"

const b = Buffer.from("äöü")

const stream: IInputOutputStream = DataViewInputOutputStream.fromBuffer(b)

console.info(stream.readString(b.byteLength,"ascii"))