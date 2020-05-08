const BaseContextManager = require('.')

describe('BaseContextManager', () => {
    it('executes the enter and exit hooks in order', () => {
        const spy = jest.fn()

        class Context extends BaseContextManager {
            _enter() {
                spy('enter')
            }

            _exit() {
                spy('exit')
            }
        }

        new Context().do(() => spy('body'))

        expect(spy).toHaveBeenNthCalledWith(1, 'enter')
        expect(spy).toHaveBeenNthCalledWith(2, 'body')
        expect(spy).toHaveBeenNthCalledWith(3, 'exit')
    })

    it('executes the error hook if the fragment throws an error', () => {
        const spy = jest.fn()

        class Context extends BaseContextManager {
            _enter() {
                spy('enter')
            }

            _error() {
                spy('error')
            }

            _exit() {
                spy('exit')
            }
        }

        new Context().do(() => {
            throw new Error()
        })

        expect(spy).toHaveBeenNthCalledWith(1, 'enter')
        expect(spy).toHaveBeenNthCalledWith(2, 'error')
        expect(spy).toHaveBeenNthCalledWith(3, 'exit')
    })

    it('scope is initially empty', () => {
        const context = new BaseContextManager()

        expect(context.scope).toEqual({})
    })

    it('initial scope can be provided to the constructor', () => {
        const scopeData = {
            yeet: 'wo',
            'wo?': 'yeet',
        }
        const context = new BaseContextManager(scopeData)

        expect(context.scope).toEqual(scopeData)
    })

    it('additional scope can be added using with', () => {
        const initialScope = { yeet: 'wo' }
        const additionalScope = { yeetus: 'wooo' }
        const context = new BaseContextManager(initialScope)
        expect(context.with(additionalScope).scope).toEqual({
            ...initialScope,
            ...additionalScope,
        })
    })

    it('with can be stacked', () => {
        const initialScope = { yeet: 'wo' }
        const additionalScope = { yeetus: 'wooo' }
        const context = new BaseContextManager()
        expect(context.with(initialScope).with(additionalScope).scope).toEqual({
            ...initialScope,
            ...additionalScope,
        })
    })

    it('do run the given function with the provided context', () => {
        const context = new BaseContextManager()
        const spy = jest.fn()
        const scope = { yeet: 'wo' }
        context.with(scope).do(spy)

        expect(spy).toHaveBeenCalledWith(scope)
    })
})
