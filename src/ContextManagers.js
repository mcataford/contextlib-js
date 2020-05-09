const AbstractContextManager = require('./AbstractContextManager')

class Suppress extends AbstractContextManager {
    constructor(suppressed) {
        super({ suppressed })
    }

    static suppress(exceptionName) {
        return new Suppress(exceptionName)
    }

    onExit(e) {
        if (e.name !== this.scope.suppressed) throw e
    }
}

module.exports = {
    Suppress,
}
