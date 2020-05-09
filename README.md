# contextjs
Like Python's `contextlib`, but weirder

## Overview

This package is Javascript rendition of [Python's `contextlib`](https://docs.python.org/3/library/contextlib.html) that tries to stick as much as possible to the original.

## Install

Once v1 is ready, it will be released on `npm`. Until then, you can simple pull down the source and pack it yourself if you are so inclined.

## Usage

`contextlib-js` offers implementations of several context managers defined in `contextlib`'s spec.

You can use the basic (empty) context by using `with` and `do`:

```
function thing(scope) {
    console.log(scope)
}

ContextManager.with({ <some additional scope }).do(thing)

// The net result of this logs the `scope` contents.
```

You can also extend or use any of the ready-made contexts: 

### `AbstractContextManager`

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

### Suppress

_[See Python ref](https://docs.python.org/3/library/contextlib.html#contextlib.suppress)_

`Suppress` suppresses the given exception (by name) but rethrows any other. This can be used as a selective `try`/`catch`:

```
Suppress.suppress(exceptionName: string).with({ context: 'stuff' }).do(thing)
```
