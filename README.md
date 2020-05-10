# contextjs
Like Python's `contextlib`, but weirder

## Overview

This package is Javascript rendition of [Python's `contextlib`](https://docs.python.org/3/library/contextlib.html) that tries to stick as much as possible to the original.

## Install

Once v1 is ready, it will be released on `npm`. Until then, you can simple pull down the source and pack it yourself if you are so inclined.

## Usage

`contextlib-js` exposes implementations of several context managers defined in `contextlib`'s spec, see [the API documentation for details](https://github.com/mcataford/contextlib-js/blob/master/API.md).

You can use the basic (empty) context by using `with` and `do`:

```
function thing(scope) {
    console.log(scope)
}

ContextManager.with({ <some additional scope }).do(thing)

// The net result of this logs the `scope` contents.
```

You can also extend or use any of the ready-made contexts or make your own using `createContext({...})`.

### Example

`contextlib-js` could be used to create an easy-to-use wrapper that handles logging task progress and results:

```js
// LoggedContext.js
const LoggedContext = createContext({ 
    onEnter: (scope) => { myLoggingLibrary.log('Task started', scope) },
    onExit: (error) => {
        if (error) {
            myLoggingLibrary.log('Oops! Something happened!')
        } else {
            myLoggingLibrary.log('All done!')
        }
    }

module.exports = LoggedContext
``` 
Once implemented, you can quickly make logged calls to your own code via

```js
LoggedContext.do(thing)
```

For most use cases, using `createContext` is the quickest way to go. Otherwise, you can roll out your own use case by extending the `AbstractContextManager` class.

## Creating contexts

You can create contexts using `createContext` and passing in overrides for `onEnter` and `onExit`:

```
const context = createContext({
    onEnter: (scope: object) => {
        // Code executed BEFORE the handler given to `do`
        ...
        // Should return an object that will be merged into the scope.
    }

    onExit: (error: object) => {
        // Code executed AFTER the handler either terminates or errors.
        // If `error` exists, it is the error thrown by the handler.
    }
})
```

Created contexts are classes that can be stored in your application and exported at will. They all inherit from `AbstractContextManager`.
