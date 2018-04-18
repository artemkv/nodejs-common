@artemkv/errorhandler - Error Handling
=======

```js
const http = require('http');
const connect = require('connect');
const errorHandler = require('@artemkv/errorhandler');

let server = connect();

server
    // Used for testing / health checks
    .use('/error', errorHandler.handleError)
    .use('/resterror', errorHandler.handleRestError)

    // Handles errors
    .use(errorHandler.handle404)
    .use(errorHandler.catchAll);	
```