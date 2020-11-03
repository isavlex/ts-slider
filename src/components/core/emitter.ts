export class Emitter {
  observers: any
  constructor() {
    this.observers = {}
  }

  subscribe<F>(eventName: string, fn: F) {
    this.observers[eventName] = this.observers[eventName] || []
    this.observers[eventName].push(fn)
    return () => {
      this.observers[eventName] = this.observers[eventName]
          .filter((observer: F) => observer !== fn)
    }
  }

  notify(eventName: string, {...args}) {
    if (!Array.isArray(this.observers[eventName])) {
      return false
    }
    this.observers[eventName].forEach((observer: any) => {
      observer({...args})
    })
    return true
  }
}
