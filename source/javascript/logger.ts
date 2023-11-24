export type ILoggerLevel = "info" | "error" | "warn" | "debug" | "trace"

export type ILoggerBase = {
    [level in ILoggerLevel]: (...args: Array<any>) => void
}

export interface ILogger extends ILoggerBase
{
    readonly label: string
    print(level: ILoggerLevel,...args: Array<any>): void
}

const otherColor = "\x1b[90m"
const timeColor = "\x1b[32m"
const resetColor = "\x1b[0m"
const labelColor = "\x1b[37m"

const levelColor: ReadonlyMap<ILoggerLevel,string> = new Map([
    ["info","\x1b[36m"],
    ["error","\x1b[31m"],
    ["warn","\x1b[33m"],
    ["debug","\x1b[35m"],
    ["trace","\x1b[34m"]
])

function formatDateColor()
{
    const formatTime = (time: number) => time.toString().padStart(2,"0")
    const date = new Date()
    const hours = formatTime(date.getHours())
    const minutes = formatTime(date.getMinutes())
    const seconds = formatTime(date.getSeconds())

    return otherColor + "[" +
           timeColor + hours +
           otherColor + ":" +
           timeColor + minutes +
           otherColor + ":" +
           timeColor + seconds +
           otherColor + "]" + resetColor
}

function formatPrefixColor(level: ILoggerLevel,label: string)
{
    return otherColor + "[" +
           levelColor.get(level) as string + level.toUpperCase() +
           otherColor + "/" +
           labelColor + label +
           otherColor + "]" + resetColor
}

function formatDateWhite()
{
    const formatTime = (time: number) => time.toString().padStart(2,"0")
    const date = new Date()
    const hours = formatTime(date.getHours())
    const minutes = formatTime(date.getMinutes())
    const seconds = formatTime(date.getSeconds())

    return "[" +
           hours +
           ":" +
           minutes +
           ":" +
           seconds +
           "]"
}

function formatPrefixWhite(level: ILoggerLevel,label: string)
{
    return "[" +
           level.toUpperCase() +
           "/" +
           label +
           "]"
}

export function createLogger(label: string,color = true): ILogger
{
    const formatDate = color ? formatDateColor : formatDateWhite
    const formatPrefix = color ? formatPrefixColor : formatPrefixWhite
    return {
        label,
        print(level, ...args)
        {
            console[level](formatDate(),formatPrefix(level,label),...args)
        },
        info(...args)
        {
            this.print("info",...args)
        },
        error(...args)
        {
            this.print("error",...args)
        },
        warn(...args)
        {
            this.print("warn",...args)
        },
        debug(...args)
        {
            this.print("debug",...args)
        },
        trace(...args)
        {
            this.print("trace",...args)
        }
    }
}