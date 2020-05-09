class AbstractContextManager {
    constructor() {
        this.scope = {}
        this.thrown = null
    }

    static with(additionalScope) {
        const context = new AbstractContextManager()
        return context.with(additionalScope)
    }

    with(additionalScope) {
        this.scope = { ...this.scope, ...additionalScope }
        return this
    }

    do(handler) {
        this.onEnter()
        try {
            handler(this.scope)
        } catch (e) {
            this.thrown = e
            this._onCatch(e)
        } finally {
            this.onExit(this.thrown)
        }
    }

    onEnter() {
        return this
    }

    onExit() {}

    _onCatch() {}
}

module.exports = AbstractContextManager
