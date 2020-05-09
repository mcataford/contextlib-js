const AbstractContextManager = require('./AbstractContextManager')

function createContext({
    onEnter = AbstractContextManager.prototype.onEnter,
    onExit = AbstractContextManager.prototype.onExit,
} = {}) {
    class Context extends AbstractContextManager {
        onEnter(scope) {
            return onEnter(scope)
        }

        onExit(e) {
            return onExit(e)
        }

        static with(scope) {
            const context = new Context()
            return context.with(scope)
        }

        static do(handler) {
            const context = new Context()
            return context.do(handler)
        }
    }

    return Context
}

module.exports = { createContext }
