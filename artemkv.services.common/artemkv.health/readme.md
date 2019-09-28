@artemkv/health - REST Health Endpoint
=======

```js
const connect = require('connect');
const health = require('@artemkv/health');

let server = connect();

server
    .use('/health', health.handleHealthCheck)
    .use('/liveness', health.handleLivenessCheck)
    .use('/readiness', health.handleReadinessCheck)

// Start the server
let env = process.env;
let port = env.NODE_PORT || 8000;
let ip = env.NODE_IP || 'localhost';
server.listen(port, ip, function () {
    console.log('Application started');
    console.log('http://' + ip + ":" + port + '/');

    // everything has been initialized
    health.setIsReady();
});
```

health endpoint is an older implementation, it always returns 200 OK

liveness returns 200 OK, unless you call ```health.setLiveness(false);```

readiness returns 503 Service Unavailable, until you call ```health.setIsReady();```