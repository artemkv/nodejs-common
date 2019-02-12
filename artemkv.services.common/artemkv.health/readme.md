@artemkv/health - REST Health Endpoint
=======

```js
const connect = require('connect');
const health = require('@artemkv/health');

let server = connect();

server
    .use('/health', health.handleHealthCheck)
```