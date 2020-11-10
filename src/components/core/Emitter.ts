interface IObservers {
  [key: string]: Array<() => void>
}

export default class Emitter {
  observers: IObservers

  constructor() {
    this.observers = {}
  }

  makeSubscribe(eventName: string, fn: () => void) {
    this.observers[eventName] = this.observers[eventName] || []
    this.observers[eventName].push(fn)
    return () => {
      this.observers[eventName] = this.observers[eventName].filter(
        (observer: () => void) => observer !== fn,
      )
    }
  }

  notify(eventName: string) {
    if (!Array.isArray(this.observers[eventName])) {
      return false
    }
    this.observers[eventName].forEach((observer: () => void) => {
      observer()
    })
    return true
  }
}
