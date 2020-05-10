const { Suppress, createContext } = require('.')

describe('contextlib', () => {
    describe('Context creator', () => {
        it('creates a context with functional static methods', () => {
            const context = createContext()
            expect(() => context.with({})).not.toThrow()
            expect(() => context.do(() => {})).not.toThrow()
        })
    })

    describe('AbstractContextManager', () => {
        it('onEnter runs before the given handler', () => {
            const spy = jest.fn()
            const context = createContext({ onEnter: () => spy('enter') })

            context.do(() => spy('handler'))

            expect(spy).toHaveBeenNthCalledWith(1, 'enter')
            expect(spy).toHaveBeenNthCalledWith(2, 'handler')
        })

        it('onExit runs after the given handler', () => {
            const spy = jest.fn()
            const context = createContext({ onExit: () => spy('exit') })
            context.do(() => spy('handler'))

            expect(spy).toHaveBeenNthCalledWith(1, 'handler')
            expect(spy).toHaveBeenNthCalledWith(2, 'exit')
        })

        it('onExit is called with the error if ones is thrown', () => {
            const spy = jest.fn()
            const context = createContext({ onExit: error => spy(error) })

            const error = new Error('Oh no!')
            expect(() =>
                context.do(() => {
                    throw error
                }),
            ).not.toThrow()
            expect(spy).toHaveBeenCalledWith(error)
        })

        it('scope is passed to the handler', () => {
            const spy = jest.fn()
            const context = createContext()

            const mockScope = { wo: 'yeet!' }

            context.with(mockScope).do(spy)

            expect(spy).toHaveBeenCalledWith(mockScope)
        })

        it('with compounts to create final scope', () => {
            const firstScope = { a: 1 }
            const secondScope = { b: 2 }
            const context = createContext().with(firstScope).with(secondScope)

            const spy = jest.fn()
            context.do(spy)

            expect(spy).toHaveBeenCalledWith({ ...firstScope, ...secondScope })
        })
    })

    describe('Suppress', () => {
        it('suppresses the given exception by name', () => {
            const fancyError = new Error()
            fancyError.name = 'MovedTooFastBrokeThingsError'

            expect(() =>
                Suppress.suppress(fancyError.name)
                    .with({})
                    .do(() => {
                        throw fancyError
                    }),
            ).not.toThrow()
        })

        it('lets other errors go through', () => {
            const fancyError = new Error()
            fancyError.name = 'MovedTooFastBrokeThingsError'

            expect(() =>
                Suppress.suppress('SomeOtherErrorName')
                    .with({})
                    .do(() => {
                        throw fancyError
                    }),
            ).toThrow()
        })
    })
})
