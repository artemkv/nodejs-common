@artemkv/logger - Custom File Logger
=======

```js
const http = require('http');
const connect = require('connect');
const logger = require('@artemkv/logger');

let server = connect();

server
    // Log session
    .use(function (req, res, next) {
        logger.logSession(req.my.path);
        return next();
    })

    // Log errors
    .use(function (err, req, res, next) {
        console.log(err);
        logger.logFailedRequest(req, res, err);
        next(err);
    })

// Start the server
let env = process.env;
let port = env.NODE_PORT || 8000;
let ip = env.NODE_IP || 'localhost';
server.listen(port, ip, function () {
    console.log('Application started');
    console.log('http://' + ip + ":" + port + '/');
    
    logger.initialize();
    logger.log('Application started: http://' + ip + ":" + port + '/');
});
```