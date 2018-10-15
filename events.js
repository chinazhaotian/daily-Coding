class EventEmeitter {
    constructor() {
        this._events = this._events || new Map();
        this._maxListeners = this._maxListeners || 10;
    }

    emit(type, ...args) {
        let handle;
        handle = this._events.get(type);
        if (args.length > 0) {
            handle.apply(this, args);
        } else {
           handle.call(this)
        }
        return true
    }

    addListener(type, fn) {
        if (!this._events.get(type)) {
            this._events.set(type, fn)
        }
    }
}

const emitter = new EventEmeitter();

emitter.addListener('arson', man => {
    console.log(`expel ${man}`)
})

emitter.emit('arson', 'low-end');