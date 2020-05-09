class AbstractContextManager {
    constructor() {
        this.scope = {}
        this.thrown = null
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
        } finally {
            this.onExit(this.thrown)
        }
    }

    onEnter() {
        return this
    }

    onExit() {}
}

module.exports = AbstractContextManager
