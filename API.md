# API documentation

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
