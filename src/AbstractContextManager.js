class AbstractContextManager {
    constructor(initialScope) {
        this.scope = initialScope || {}
        this.thrown = null
    }

    static with(additionalScope) {
        return new AbstractContextManager().with(additionalScope)
    }

    with(additionalScope) {
        this.scope = { ...this.scope, ...additionalScope }
        return this
    }

    static do(handler) {
        new AbstractContextManager().do(handler)
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
