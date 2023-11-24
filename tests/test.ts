import { createLogger } from "../source/javascript/logger"
import { IInputOutputStream } from "../source/stream"
import { DataViewInputOutputStream } from "../source/stream/view"

import * as libks from "../source"

const b = Buffer.from("äöü")

const stream: IInputOutputStream = DataViewInputOutputStream.fromBuffer(b)

console.info(stream.readString(b.byteLength,"ascii"))