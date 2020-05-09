const AbstractContextManager = require('./AbstractContextManager')

class Suppress extends AbstractContextManager {
    constructor(exceptionName) {
        super()
        this._suppressed = exceptionName
    }

    get suppressed() {
        return this._suppressed
    }

    static suppress(exceptionName) {
        return new Suppress(exceptionName)
    }

    _onCatch(e) {
        if (e.name !== this.suppressed) throw e
    }
}

module.exports = {
    Suppress,
}
