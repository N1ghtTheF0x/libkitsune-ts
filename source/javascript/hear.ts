import { CustomError } from "./error"

export type HearEventFunction = (...args: Array<any>) => void
export type HearEventName = string | symbol | number

export interface HearEventMap
{
    [name: HearEventName]: HearEventFunction
}

export interface HearEventListener<Caller extends HearEventFunction = HearEventFunction>
{
    caller: HearEventFunction
    once: boolean
}

export class Hear<E extends HearEventMap>
{
    private _listeners: Map<HearEventName,Array<HearEventListener>> = new Map()
    public constructor()
    {

    }
    private _add<N extends keyof E>(name: N,listener: HearEventListener<E[N]>)
    {
        const array = this.listeners(name)
        array.push(listener)
        this._listeners.set(name,array)
        return this
    }
    private _remove<N extends keyof E>(name: N,listener: HearEventListener<E[N]>)
    {
        const array = this.listeners(name)
        if(!array.includes(listener))
            return false
        array.splice(array.indexOf(listener),1)
        this._listeners.set(name,array)
        return true
    }
    public remove<N extends keyof E>(name: N,caller: E[N])
    {
        for(const listener of this.listeners(name))
            if(listener.caller == caller)
                return this._remove(name,listener)
        return false
    }
    public on<N extends keyof E>(name: N,caller: E[N])
    {
        return this._add(name,{
            caller,
            once: false
        })
    }
    public once<N extends keyof E>(name: N,caller: E[N])
    {
        return this._add(name,{
            caller,
            once: true
        })
    }
    public emit<N extends keyof E>(name: N,...args: Parameters<E[N]>)
    {
        for(const listener of this.listeners(name))
            try
            {
                listener.caller(...args)
            }
            catch(e)
            {
                console.error(new HearEmitError(name,listener.caller,{cause: e}))
                return false
            }
            finally
            {
                if(listener.once)
                    this._remove(name,listener)
            }
        return true
    }
    public listeners<N extends keyof E>(name: N): Array<HearEventListener<E[N]>>
    {
        return this._listeners.get(name) ?? []
    }
    public callers<N extends keyof E>(name: N): Array<E[N]>
    {
        return this.listeners(name).map((l) => l.caller as E[N])
    }
}

export class HearEmitError extends CustomError
{
    public constructor(public eventName: HearEventName,public caller: HearEventFunction,options?: ErrorOptions)
    {
        super("HearEmitError",`"${String(eventName)}" caused an exception with caller "${caller.name}"`,options)
    }
}