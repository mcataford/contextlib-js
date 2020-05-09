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

You can also extend or use any of the ready-made contexts, detailed in the API reference.

### Example

`contextlib-js` could be used to create an easy-to-use wrapper that handles logging task progress and results:

```
class LoggedContext extends AbstractContextManager {
    onEnter() {
        myLoggingLibrary.log('Task started')
    }

    onExit(e) {
        if (e) {
            myLoggingLibrary.log('Oops! Something happened!')
        } else {
            myLoggingLibrary.log('All done!')
        }
    }
}
```

Once implemented, you can quickly make logged calls to your own code via

```
LoggedContext.do(thing)
```
