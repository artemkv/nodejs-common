@artemkv/myrequest - Extra properties on request object
=======

```js
const http = require('http');
const connect = require('connect');
const myRequest = require('@artemkv/myrequest');

let server = connect();

server
    // Assemble my request
    .use(myRequest)
```