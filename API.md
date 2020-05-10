# API documentation

## `createContext`

`createContext` is a utility through which you can quickly create contexts with custom `onEnter` and `onExit` handlers. It assumes that the given lifecycle handlers are _synchronous_ and will always execute them in-order ( onEnter -> handler -> onExit ).

```
const ctx = createContext({
    onEnter: (scope) => { console.log(`this is the scope! ${scope}`) }
    onExit: (e) => { console.log(e ? `Something happened! ${e}` : 'All done!') }
})
```
The resulting context is a subclass of `AbstractContextManager`.

## `AbstractContextManager`

`AbstractContextManager` is the base class through which all of the other synchronous context managers are implemented. You can extend it to create your own. When extending it, you should implement one or more of the following:

```
class MyCoolContext extends AbstractContextManager {
    onEnter([scope]) {
        // Is executed before the handler and has access to the scope.
        // The scope returned will be merged with the current scope.
    }

    onExit([e]) {
        // Is executed at the end of the context's execution lifecycle
    }
}
```

It can also be used directly, in which case `onEnter` and `onExit` are no-ops.

## `Suppress`

_[See Python ref](https://docs.python.org/3/library/contextlib.html#contextlib.suppress)_

`Suppress` suppresses the given exception (by name) but rethrows any other. This can be used as a selective `try`/`catch`:

```
Suppress.suppress(exceptionName: string).with({ context: 'stuff' }).do(thing)
```
