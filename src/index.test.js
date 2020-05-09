const { AbstractContextManager, Suppress } = require('.')

describe('contextlib', () => {
    describe('AbstractContextManager', () => {
        it('onEnter runs before the given handler', () => {
            const spy = jest.fn()

            class Context extends AbstractContextManager {
                onEnter() {
                    spy('enter')
                }
            }

            new Context().do(() => spy('handler'))

            expect(spy).toHaveBeenNthCalledWith(1, 'enter')
            expect(spy).toHaveBeenNthCalledWith(2, 'handler')
        })

        it('onExit runs after the given handler', () => {
            const spy = jest.fn()

            class Context extends AbstractContextManager {
                onExit() {
                    spy('exit')
                }
            }

            new Context().do(() => spy('handler'))

            expect(spy).toHaveBeenNthCalledWith(1, 'handler')
            expect(spy).toHaveBeenNthCalledWith(2, 'exit')
        })

        it('onExit is called with the error if ones is thrown', () => {
            const spy = jest.fn()

            class Context extends AbstractContextManager {
                onExit(error) {
                    spy(error)
                }
            }

            const error = new Error('Oh no!')
            expect(() =>
                new Context().do(() => {
                    throw error
                }),
            ).not.toThrow()
            expect(spy).toHaveBeenCalledWith(error)
        })

        it('scope is passed to the handler', () => {
            const spy = jest.fn()

            class Context extends AbstractContextManager {}

            const mockScope = { wo: 'yeet!' }

            Context.with(mockScope).do(spy)

            expect(spy).toHaveBeenCalledWith(mockScope)
        })

        it('with compounts to create final scope', () => {
            const firstScope = { a: 1 }
            const secondScope = { b: 2 }
            class Context extends AbstractContextManager {}
            const context = Context.with(firstScope).with(secondScope)

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
