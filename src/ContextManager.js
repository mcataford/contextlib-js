class BaseContextManager {
    constructor(initialContext = {}) {
        this.scope = initialContext
        this.results = {}
    }

    with(bindings) {
        this.scope = { ...this.scope, ...bindings }
        return this
    }

    do(fragment) {
        this._enter()
        try {
            fragment(this.scope)
        } catch (e) {
            this._error(e)
            this.results.error = e
        } finally {
            this._exit()
        }
        return this.results
    }

    _enter() {}

    _exit() {}

    _error() {}
}

module.exports = BaseContextManager
