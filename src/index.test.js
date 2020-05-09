const { AbstractContextManager } = require('.')

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

            const context = new Context()
            const mockScope = { wo: 'yeet!' }

            context.with(mockScope).do(spy)

            expect(spy).toHaveBeenCalledWith(mockScope)
        })

        it('with compounts to create final scope', () => {
            const firstScope = { a: 1 }
            const secondScope = { b: 2 }
            class Context extends AbstractContextManager {}
            const context = new Context().with(firstScope).with(secondScope)

            const spy = jest.fn()
            context.do(spy)

            expect(spy).toHaveBeenCalledWith({ ...firstScope, ...secondScope })
        })
    })
})
